import { Link } from "@tanstack/react-router";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const LOGO = "https://pbs.twimg.com/profile_images/1955238194443849732/sHyVRItm.jpg";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const links = [
    { to: "/", label: "Home" },
    { to: "/my-domains", label: "My Domains" },
    { to: "/leaderboard", label: "Leaderboard" },
  ] as const;

  return (
    <header className="sticky top-0 z-40 glass-strong">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={LOGO} alt="Arc" className="h-9 w-9 rounded-full ring-2 ring-[#00d4ff]/50" />
          <span className="text-xl font-bold tracking-tight">
            Arc<span className="text-[#00d4ff] text-glow">NS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-[#00d4ff]"
              activeProps={{ className: "text-[#00d4ff]" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#00d4ff]/10 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-base font-medium text-muted-foreground hover:text-[#00d4ff]"
              activeProps={{ className: "text-[#00d4ff]" }}
            >
              {l.label}
            </Link>
          ))}
          <div className="pt-2">
            <ConnectButton showBalance={false} chainStatus="none" accountStatus="address" />
          </div>
        </div>
      )}
    </header>
  );
}