import { createFileRoute } from "@tanstack/react-router";
import { useReadContract } from "wagmi";
import { ARCNS_ABI, ARCNS_ADDRESS } from "@/lib/web3/contract";
import { MintBox } from "@/components/MintBox";
import { Search, Sparkles, Wallet } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ArcNS — Claim Your .arc Domain" },
      { name: "description", content: "Mint your .arc domain on Arc Testnet using USDC or EURC." },
      { property: "og:title", content: "ArcNS — Claim Your .arc Domain" },
      { property: "og:description", content: "Your identity on Arc Testnet." },
    ],
  }),
  component: Index,
});

function Index() {
  const { data: total } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "getTotalMinted",
  });

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8">
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#00d4ff] mb-6">
          <Sparkles size={14} /> Live on Arc Testnet
        </div>
        <h1 className="text-4xl md:text-7xl font-black tracking-tight">
          Claim Your <span className="text-[#00d4ff] text-glow">.arc</span> Domain
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
          Your identity on Arc Testnet.
        </p>
        <div className="mt-10">
          <MintBox />
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 my-12">
        <StatCard label="Total Minted" value={total != null ? String(total) : "—"} />
        <StatCard label="Price" value="1 USDC / EURC" />
        <StatCard label="Network" value="Arc Testnet" />
      </section>

      <section className="py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          How it <span className="text-[#00d4ff]">works</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Step n={1} icon={<Search size={24} />} title="Search" desc="Type your desired domain name and check availability instantly." />
          <Step n={2} icon={<Wallet size={24} />} title="Mint" desc="Pay 1 USDC or 1 EURC. Approve & mint in a single flow." />
          <Step n={3} icon={<Sparkles size={24} />} title="Own" desc="Your .arc domain lives on-chain. Forever yours." />
        </div>
      </section>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-2xl p-6 text-center">
      <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="text-2xl md:text-3xl font-bold text-[#00d4ff] mt-2">{value}</p>
    </div>
  );
}

function Step({ n, icon, title, desc }: { n: number; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="glass rounded-2xl p-6 relative">
      <div className="absolute top-4 right-4 text-5xl font-black text-[#00d4ff]/10">{n}</div>
      <div className="text-[#00d4ff] mb-3">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
