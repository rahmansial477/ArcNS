import { useEffect, useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, usePublicClient } from "wagmi";
import { ARCNS_ABI, ARCNS_ADDRESS, ERC20_ABI, EURC_ADDRESS, PRICE, USDC_ADDRESS } from "@/lib/web3/contract";
import { Loader2, Search, CheckCircle2, XCircle, ExternalLink } from "lucide-react";
import { toast } from "sonner";

const DOMAIN_RE = /^[a-z0-9]+$/;
const MAX_LEN = 30;
const MIN_LEN = 3;

export function MintBox() {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [name, setName] = useState("");
  const [debounced, setDebounced] = useState("");
  const [minting, setMinting] = useState<null | "USDC" | "EURC">(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>();

  useEffect(() => {
    const t = setTimeout(() => setDebounced(name.trim().toLowerCase()), 350);
    return () => clearTimeout(t);
  }, [name]);

  const valid = debounced.length >= MIN_LEN && debounced.length <= MAX_LEN && DOMAIN_RE.test(debounced);

  const { data: available, isFetching, refetch } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "isAvailable",
    args: valid ? [debounced] : undefined,
    query: { enabled: valid },
  });

  const { writeContractAsync } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash: txHash });

  useEffect(() => {
    if (isSuccess && txHash) {
      toast.success("Domain minted!", {
        action: {
          label: "View tx",
          onClick: () => window.open(`https://testnet.arcscan.app/tx/${txHash}`, "_blank"),
        },
      });
      setName("");
      setTxHash(undefined);
      setMinting(null);
      refetch();
    }
  }, [isSuccess, txHash, refetch]);

  const mint = async (currency: "USDC" | "EURC") => {
    if (!address || !publicClient) return;
    setMinting(currency);
    try {
      const token = currency === "USDC" ? USDC_ADDRESS : EURC_ADDRESS;
      const allowance = (await publicClient.readContract({
        address: token,
        abi: ERC20_ABI,
        functionName: "allowance",
        args: [address, ARCNS_ADDRESS],
      })) as bigint;

      if (allowance < PRICE) {
        toast.info(`Approving ${currency}…`);
        const approveHash = await writeContractAsync({
          address: token,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [ARCNS_ADDRESS, PRICE],
        });
        await publicClient.waitForTransactionReceipt({ hash: approveHash });
      }

      toast.info(`Minting ${debounced}.arc…`);
      const hash = await writeContractAsync({
        address: ARCNS_ADDRESS,
        abi: ARCNS_ABI,
        functionName: currency === "USDC" ? "mintWithUSDC" : "mintWithEURC",
        args: [debounced],
      });
      setTxHash(hash);
    } catch (e: any) {
      toast.error(e?.shortMessage || e?.message || "Mint failed");
      setMinting(null);
    }
  };

  const busy = minting !== null || confirming;
  const showStatus = valid && !isFetching && available !== undefined;
  const borderState =
    showStatus && available === true ? "is-available" :
    showStatus && available === false ? "is-taken" : "";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className={`search-glow ${borderState}`}>
        <div className="search-inner flex items-center gap-2 p-2">
          <div className="pl-4">
            <Search className="text-[#06b6d4]" size={20} />
          </div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s/g, ""))}
            maxLength={MAX_LEN}
            placeholder="Type your domain name"
            className="search-input flex-1 bg-transparent py-4 text-lg text-white outline-none placeholder:text-[#94a3b8]"
          />
          <span className="pr-2 text-lg font-bold font-mono text-[#06b6d4]">.arc</span>
          <span className="pr-4 text-xs font-mono tabular-nums" style={{ color: "#cbd5e1" }}>
            {name.length}/{MAX_LEN}
          </span>
        </div>
      </div>
      <p className="mt-2 text-center text-xs" style={{ color: "#cbd5e1" }}>
        {MIN_LEN}–{MAX_LEN} characters, lowercase letters & numbers only
      </p>

      <div className="mt-4 min-h-[80px]">
        {name && !valid && (
          <p className="text-sm text-muted-foreground text-center">
            {MIN_LEN}–{MAX_LEN} chars, lowercase letters & numbers only
          </p>
        )}
        {valid && isFetching && (
          <p className="text-center text-muted-foreground flex justify-center items-center gap-2">
            <Loader2 className="animate-spin" size={16} /> Checking…
          </p>
        )}
        {showStatus && available === true && (
          <div className="glass rounded-xl p-4 border-green-400/40" style={{ boxShadow: "0 0 24px rgba(34,197,94,0.25)" }}>
            <p className="flex items-center gap-2 text-green-400 font-semibold mb-3">
              <CheckCircle2 size={20} /> {debounced}.arc is available
            </p>
            {!isConnected ? (
              <p className="text-sm text-muted-foreground">Connect your wallet to mint</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  disabled={busy}
                  onClick={() => mint("USDC")}
                  className="btn-gradient flex items-center justify-center gap-2 rounded-lg font-bold py-3 hover:shadow-glow hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {minting === "USDC" && <Loader2 className="animate-spin" size={16} />}
                  Mint with USDC — 1 USDC
                </button>
                <button
                  disabled={busy}
                  onClick={() => mint("EURC")}
                  className="flex items-center justify-center gap-2 rounded-lg border border-[#8b5cf6]/60 text-[#06b6d4] font-bold py-3 hover:bg-[#8b5cf6]/10 hover:shadow-glow transition-all disabled:opacity-50"
                >
                  {minting === "EURC" && <Loader2 className="animate-spin" size={16} />}
                  Mint with EURC — 1 EURC
                </button>
              </div>
            )}
            {txHash && (
              <a
                href={`https://testnet.arcscan.app/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-xs text-[#06b6d4]"
              >
                View transaction <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}
        {showStatus && available === false && (
          <div className="glass rounded-xl p-4 border-red-400/40" style={{ boxShadow: "0 0 24px rgba(239,68,68,0.2)" }}>
            <p className="flex items-center gap-2 text-red-400 font-semibold">
              <XCircle size={20} /> Domain already taken ❌
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {debounced}.arc has already been minted. Try another name.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}