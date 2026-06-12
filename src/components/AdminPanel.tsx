import { useState } from "react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { formatUnits } from "viem";
import { ARCNS_ABI, ARCNS_ADDRESS, OWNER_ADDRESS, USDC_ADDRESS, EURC_ADDRESS } from "@/lib/web3/contract";
import { Shield, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AdminPanel() {
  const { address } = useAccount();
  const [open, setOpen] = useState(false);

  if (!address || address.toLowerCase() !== OWNER_ADDRESS.toLowerCase()) return null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-[#00d4ff] px-5 py-3 text-sm font-bold text-black shadow-glow hover:scale-105 transition-transform"
      >
        <Shield size={18} />
        Admin
      </button>
      {open && <AdminModal onClose={() => setOpen(false)} />}
    </>
  );
}

function AdminModal({ onClose }: { onClose: () => void }) {
  const usdcBal = useReadContract({ address: ARCNS_ADDRESS, abi: ARCNS_ABI, functionName: "getUSDCBalance" });
  const eurcBal = useReadContract({ address: ARCNS_ADDRESS, abi: ARCNS_ABI, functionName: "getEURCBalance" });
  const total = useReadContract({ address: ARCNS_ADDRESS, abi: ARCNS_ABI, functionName: "getTotalMinted" });
  const all = useReadContract({ address: ARCNS_ADDRESS, abi: ARCNS_ABI, functionName: "getAllDomains" });

  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: confirming, isSuccess } = useWaitForTransactionReceipt({ hash });

  if (isSuccess) {
    toast.success("Withdrawal confirmed");
    usdcBal.refetch();
    eurcBal.refetch();
  }

  const withdraw = (token: `0x${string}`) => {
    try {
      writeContract({ address: ARCNS_ADDRESS, abi: ARCNS_ABI, functionName: "withdraw", args: [token] });
    } catch (e: any) {
      toast.error(e?.shortMessage || "Withdraw failed");
    }
  };

  const busy = isPending || confirming;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        className="glass-strong relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-muted-foreground hover:text-[#00d4ff]">
          <X size={22} />
        </button>
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Shield className="text-[#00d4ff]" /> Admin Panel
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat label="USDC" value={usdcBal.data != null ? formatUnits(usdcBal.data as bigint, 6) : "—"} />
          <Stat label="EURC" value={eurcBal.data != null ? formatUnits(eurcBal.data as bigint, 6) : "—"} />
          <Stat label="Minted" value={total.data != null ? String(total.data) : "—"} />
        </div>

        <div className="flex gap-3 mb-6">
          <button
            disabled={busy}
            onClick={() => withdraw(USDC_ADDRESS)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/40 py-3 font-semibold hover:bg-[#00d4ff]/30 disabled:opacity-50"
          >
            {busy && <Loader2 className="animate-spin" size={16} />} Withdraw USDC
          </button>
          <button
            disabled={busy}
            onClick={() => withdraw(EURC_ADDRESS)}
            className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-[#00d4ff]/20 border border-[#00d4ff]/40 py-3 font-semibold hover:bg-[#00d4ff]/30 disabled:opacity-50"
          >
            {busy && <Loader2 className="animate-spin" size={16} />} Withdraw EURC
          </button>
        </div>

        <h3 className="font-semibold mb-3 text-sm text-muted-foreground uppercase tracking-wider">All Domains</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {(all.data as string[] | undefined)?.map((d, i) => (
            <div key={i} className="glass rounded-lg px-4 py-2 flex justify-between items-center">
              <span className="font-mono">{d}.arc</span>
              <span className="text-xs text-muted-foreground">#{i + 1}</span>
            </div>
          )) ?? <p className="text-sm text-muted-foreground">No domains yet</p>}
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="text-xl font-bold text-[#00d4ff] mt-1 truncate">{value}</p>
    </div>
  );
}