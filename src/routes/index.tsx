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
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs font-medium text-[#06b6d4] mb-6">
          <Sparkles size={14} /> Live on Arc Testnet
        </div>
        <h1
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-white"
          style={{ textShadow: "0 0 30px rgba(99,102,241,0.5)" }}
        >
          Claim Your <span className="text-[#06b6d4] text-glow">.arc</span> Domain
        </h1>
        <p className="gradient-text mt-4 text-xl md:text-2xl font-bold max-w-xl mx-auto">
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          How it <span className="text-[#06b6d4]">works</span>
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
    <div
      className="rounded-xl p-6 text-center transition-all hover:-translate-y-0.5"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(99,102,241,0.4)",
        boxShadow: "inset 0 0 0 1px rgba(6,182,212,0.15)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.8)";
        e.currentTarget.style.boxShadow = "0 0 15px rgba(6,182,212,0.3)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(99,102,241,0.4)";
        e.currentTarget.style.boxShadow = "inset 0 0 0 1px rgba(6,182,212,0.15)";
      }}
    >
      <p className="text-xs uppercase tracking-widest font-semibold text-white opacity-100">{label}</p>
      <p className="text-3xl md:text-4xl font-bold text-[#06b6d4] mt-2" style={{ textShadow: "0 0 24px rgba(6,182,212,0.45)" }}>
        {value}
      </p>
    </div>
  );
}

function Step({ n, icon, title, desc }: { n: number; icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div
      className="rounded-2xl p-6 relative transition-all"
      style={{
        background: "rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(139,92,246,0.4)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(6,182,212,0.6)";
        e.currentTarget.style.boxShadow = "0 0 20px rgba(6,182,212,0.2)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      <div className="absolute top-4 right-4 text-3xl font-extrabold gradient-text">{n}</div>
      <div className="text-[#06b6d4] mb-3">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-sm" style={{ color: "#cbd5e1" }}>{desc}</p>
    </div>
  );
}
