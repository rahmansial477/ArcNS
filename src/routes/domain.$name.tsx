import { createFileRoute, Link } from "@tanstack/react-router";
import { useReadContract } from "wagmi";
import { ARCNS_ABI, ARCNS_ADDRESS } from "@/lib/web3/contract";
import { Globe, ExternalLink, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/domain/$name")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.name}.arc — ArcNS` },
      { name: "description", content: `Details for ${params.name}.arc on Arc Testnet.` },
    ],
  }),
  component: DomainPage,
});

function DomainPage() {
  const { name } = Route.useParams();
  const { data: available, isLoading } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "isAvailable",
    args: [name],
  });

  const taken = available === false;

  return (
    <div className="mx-auto max-w-3xl px-4 md:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-[#06b6d4] mb-6">
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
        <Globe className="mx-auto text-[#06b6d4] mb-4" size={56} />
        <h1 className="text-4xl md:text-6xl font-black tracking-tight break-all">
          {name}<span className="text-[#06b6d4]">.arc</span>
        </h1>

        <div className="mt-8">
          {isLoading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : taken ? (
            <div>
              <span className="inline-block rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/40 text-[#06b6d4] px-4 py-1 text-sm font-medium">
                Registered
              </span>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <Info label="Status" value="Owned" />
                <Info label="Network" value="Arc Testnet" />
              </div>
              <a
                href={`https://testnet.arcscan.app/address/${ARCNS_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-[#06b6d4] hover:text-glow"
              >
                View on Explorer <ExternalLink size={16} />
              </a>
            </div>
          ) : (
            <div>
              <span className="inline-block rounded-full bg-green-400/10 border border-green-400/40 text-green-400 px-4 py-1 text-sm font-medium">
                Available
              </span>
              <p className="mt-4 text-muted-foreground">This domain is available to mint.</p>
              <Link to="/" className="inline-flex mt-6 rounded-lg bg-[#06b6d4] text-black font-bold px-6 py-3 hover:shadow-glow">
                Mint now
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}