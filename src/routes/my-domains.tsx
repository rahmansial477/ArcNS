import { createFileRoute, Link } from "@tanstack/react-router";
import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ARCNS_ABI, ARCNS_ADDRESS } from "@/lib/web3/contract";
import { Globe } from "lucide-react";

export const Route = createFileRoute("/my-domains")({
  head: () => ({
    meta: [
      { title: "My Domains — ArcNS" },
      { name: "description", content: "View your .arc domains on Arc Testnet." },
    ],
  }),
  component: MyDomainsPage,
});

function MyDomainsPage() {
  const { address, isConnected } = useAccount();
  const { data, isLoading } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "getUserDomains",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">My <span className="text-[#06b6d4]">Domains</span></h1>
      <p className="text-muted-foreground mb-8">All .arc domains owned by your connected wallet.</p>

      {!isConnected ? (
        <div className="glass rounded-2xl p-12 text-center">
          <p className="mb-6 text-muted-foreground">Connect your wallet to view your domains</p>
          <div className="inline-block"><ConnectButton /></div>
        </div>
      ) : isLoading ? (
        <p className="text-muted-foreground text-center py-12">Loading…</p>
      ) : !data || (data as string[]).length === 0 ? (
        <div className="glass rounded-2xl p-12 text-center">
          <Globe className="mx-auto mb-4 text-[#06b6d4]" size={48} />
          <p className="text-lg font-semibold mb-2">No domains yet!</p>
          <p className="text-muted-foreground mb-6">Mint your first .arc domain!</p>
          <Link to="/" className="inline-flex rounded-lg bg-[#06b6d4] text-black font-bold px-6 py-3 hover:shadow-glow">
            Mint now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(data as string[]).map((name) => (
            <Link
              key={name}
              to="/domain/$name"
              params={{ name }}
              className="glass rounded-2xl p-6 hover:shadow-glow hover:border-[#06b6d4]/40 hover:-translate-y-0.5 transition-all group"
            >
              <Globe className="text-[#06b6d4] mb-3" size={28} />
              <p className="text-xl font-bold group-hover:text-[#06b6d4] transition-colors">{name}.arc</p>
              <p className="text-xs text-muted-foreground mt-3">Owned domain</p>
              <p className="text-xs text-muted-foreground mt-1 font-mono truncate">
                {address?.slice(0, 6)}…{address?.slice(-4)}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}