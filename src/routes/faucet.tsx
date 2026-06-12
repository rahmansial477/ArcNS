import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Droplets } from "lucide-react";

export const Route = createFileRoute("/faucet")({
  head: () => ({
    meta: [
      { title: "Faucet — ArcNS" },
      { name: "description", content: "Get testnet USDC and Arc Testnet tokens to mint .arc domains." },
    ],
  }),
  component: FaucetPage,
});

function FaucetPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-2">
        Testnet <span className="text-[#06b6d4]">Faucet</span>
      </h1>
      <p className="text-muted-foreground mb-10">Grab free testnet tokens to mint your .arc domain.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FaucetCard
          title="Get Testnet USDC"
          desc="Claim USDC from Circle's official faucet to pay for minting."
          href="https://faucet.circle.com/"
          cta="Open Circle Faucet"
        />
        <FaucetCard
          title="Get Arc Testnet Tokens"
          desc="Claim native Arc testnet tokens for gas fees."
          href="https://faucet.testnet.arc.network"
          cta="Open Arc Faucet"
        />
      </div>
    </div>
  );
}

function FaucetCard({ title, desc, href, cta }: { title: string; desc: string; href: string; cta: string }) {
  return (
    <div className="glass rounded-2xl p-6 hover:shadow-glow hover:border-[#06b6d4]/40 transition-all">
      <Droplets className="text-[#06b6d4] mb-4" size={32} />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-sm text-muted-foreground mb-6">{desc}</p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gradient inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold hover:shadow-glow hover:brightness-110 transition-all"
      >
        {cta} <ExternalLink size={14} />
      </a>
    </div>
  );
}
