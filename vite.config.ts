// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    plugins: [
      nodePolyfills({
        include: ["events", "buffer", "process", "util", "stream"],
        globals: { Buffer: true, global: true, process: true },
      }),
    ],
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    optimizeDeps: {
      include: [
        "@walletconnect/time",
        "@walletconnect/utils",
        "@walletconnect/core",
        "@walletconnect/sign-client",
        "@walletconnect/universal-provider",
        "@walletconnect/ethereum-provider",
      ],
    },
  },
});
