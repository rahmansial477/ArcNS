import { useEffect, useState, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { wagmiConfig } from "./config";

export function Web3Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider
        theme={darkTheme({
          accentColor: "#00d4ff",
          accentColorForeground: "#0a0a0a",
          borderRadius: "medium",
          overlayBlur: "small",
        })}
        modalSize="compact"
      >
        {mounted ? children : <div style={{ visibility: "hidden" }}>{children}</div>}
      </RainbowKitProvider>
    </WagmiProvider>
  );
}