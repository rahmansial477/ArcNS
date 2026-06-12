import { createFileRoute } from "@tanstack/react-router";
import { useReadContract } from "wagmi";
import { ARCNS_ABI, ARCNS_ADDRESS } from "@/lib/web3/contract";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title: "Leaderboard — ArcNS" },
      { name: "description", content: "Top minters of .arc domains on Arc Testnet." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  const { data: total } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "getTotalMinted",
  });
  const { data: all } = useReadContract({
    address: ARCNS_ADDRESS,
    abi: ARCNS_ABI,
    functionName: "getAllDomains",
  });

  const domains = (all as string[] | undefined) ?? [];

  return (
    <div className="mx-auto max-w-4xl px-4 md:px-8 py-12">
      <div className="text-center mb-10">
        <Trophy className="mx-auto text-[#00d4ff] mb-3" size={42} />
        <h1 className="text-4xl md:text-5xl font-bold">
          Leader<span className="text-[#00d4ff]">board</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Total domains minted:{" "}
          <span className="text-[#00d4ff] font-bold">{total != null ? String(total) : "—"}</span>
        </p>
      </div>

      <div className="glass-strong rounded-2xl overflow-hidden">
        <div className="grid grid-cols-[60px_1fr_80px] gap-3 px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground border-b border-[#00d4ff]/10">
          <span>Rank</span>
          <span>Domain</span>
          <span className="text-right">#</span>
        </div>
        {domains.length === 0 ? (
          <p className="text-center text-muted-foreground py-10">No domains minted yet</p>
        ) : (
          domains.map((d, i) => (
            <div
              key={d}
              className="grid grid-cols-[60px_1fr_80px] gap-3 px-5 py-3 items-center border-b border-[#00d4ff]/5 last:border-0"
            >
              <span className={`font-bold ${i < 3 ? "text-[#00d4ff]" : "text-muted-foreground"}`}>
                #{i + 1}
              </span>
              <span className="font-mono">{d}.arc</span>
              <span className="text-right text-muted-foreground text-sm">1</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}