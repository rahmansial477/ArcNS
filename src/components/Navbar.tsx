import { Link } from "@tanstack/react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useRef, useState } from "react";
import { Menu, X, MoreVertical, ExternalLink, LogOut, Wallet } from "lucide-react";
import { useDisconnect } from "wagmi";

const LOGO = "https://pbs.twimg.com/profile_images/1955238194443849732/sHyVRItm.jpg";

function WalletButton() {
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <ConnectButton.Custom>
      {({ account, chain, openConnectModal, mounted }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="btn-gradient hover:btn-gradient inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold shadow-glow hover:brightness-110"
            >
              <Wallet size={16} /> Connect Wallet
            </button>
          );
        }
        const short = `${account.address.slice(0, 6)}…${account.address.slice(-4)}`;
        return (
          <div className="relative" ref={ref}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="glass-strong inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium hover:border-[#06b6d4]/60"
              aria-label="Wallet menu"
            >
              <span className="hidden sm:inline text-[#06b6d4] font-mono">{short}</span>
              <MoreVertical size={18} />
            </button>
            {open && (
              <div className="absolute right-0 mt-2 w-64 glass-strong rounded-xl p-3 shadow-glow animate-fade-in z-50">
                <div className="px-2 py-2 border-b border-[#06b6d4]/10">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Address</p>
                  <p className="font-mono text-sm text-[#06b6d4] break-all">{short}</p>
                </div>
                <div className="px-2 py-2 border-b border-[#06b6d4]/10">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Network</p>
                  <p className="text-sm">Arc Testnet</p>
                </div>
                <a
                  href={`https://testnet.arcscan.app/address/${account.address}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-white/5"
                  onClick={() => setOpen(false)}
                >
                  <ExternalLink size={14} /> View on Explorer
                </a>
                <button
                  onClick={() => { setOpen(false); disconnect(); }}
                  className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-red-400 hover:bg-red-500/10"
                >
                  <LogOut size={14} /> Disconnect
                </button>
              </div>
            )}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/my-domains", label: "My Domains" },
    { to: "/leaderboard", label: "Leaderboard" },
    { to: "/faucet", label: "Faucet" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/[0.02] border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO} alt="Arc" className="h-9 w-9 rounded-full ring-2 ring-[#06b6d4]/50" />
          <span className="text-xl font-bold tracking-tight">
            Arc<span className="text-[#06b6d4] text-glow">NS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-semibold text-white opacity-100 transition-colors hover:text-[#06b6d4]"
              activeProps={{ className: "text-[#06b6d4]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <WalletButton />
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#06b6d4]/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-base font-semibold text-white hover:text-[#06b6d4]"
              activeProps={{ className: "text-[#06b6d4]" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <WalletButton />
          </div>
        </div>
      )}
    </header>
  );
}