import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Droplets } from "lucide-react";

export const Route = createFileRoute("/faucet")({
  head: () => ({
    meta: [
      { title: "Faucet — ArcNS" },
      { name: "description", content: "Get free testnet USDC from Circle's faucet to mint your .arc domain." },
    ],
  }),
  component: FaucetPage,
});

const STEPS = [
  "Connect your wallet",
  "Visit Circle faucet",
  "Enter your wallet address",
  "Receive free USDC",
  "Come back and mint your .arc domain",
];

function FaucetPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white text-center">
        Testnet <span className="text-[#06b6d4]">Faucet</span>
      </h1>
      <p className="text-center mb-10" style={{ color: "#cbd5e1" }}>
        Grab free testnet USDC to mint your .arc domain.
      </p>

      <div className="glass rounded-3xl p-10 text-center hover:shadow-glow hover:border-[#06b6d4]/40 transition-all">
        <div
          className="mx-auto mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full"
          style={{ background: "rgba(6,182,212,0.15)", boxShadow: "0 0 32px rgba(6,182,212,0.45)" }}
        >
          <Droplets className="text-[#06b6d4]" size={40} />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">Get Testnet USDC</h2>
        <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "#e2e8f0" }}>
          Get free USDC tokens on Arc Testnet from Circle's official faucet to test ArcNS.
        </p>
        <a
          href="https://faucet.circle.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gradient inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold shadow-glow hover:brightness-110 transition-all"
        >
          💧 Get Free USDC <ExternalLink size={16} />
        </a>
      </div>

      <div className="mt-10 glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold mb-4 text-white">How to get USDC</h3>
        <ol className="space-y-3">
          {STEPS.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-0.5 inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-[#06b6d4]"
                style={{ background: "rgba(6,182,212,0.2)", boxShadow: "0 0 12px rgba(6,182,212,0.4)" }}
              >
                {i + 1}
              </span>
              <span className="text-base pt-0.5" style={{ color: "#e2e8f0" }}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
