import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arcTestnet } from "./chain";
import { http } from "viem";

export const wagmiConfig = getDefaultConfig({
  appName: "ArcNS",
  projectId: "5cb371656a2f531d521668672978a420",
  chains: [arcTestnet],
  transports: {
    [arcTestnet.id]: http("https://rpc.testnet.arc.network"),
  },
  ssr: true,
});