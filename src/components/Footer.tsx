export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-8 text-center text-sm text-muted-foreground">
      <a
        href="https://x.com/rahmansial477"
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground hover:text-[#06b6d4] transition-colors font-medium"
      >
        Built by Rahman
      </a>
      <div className="mt-3 flex justify-center">
        <a
          href="https://x.com/rahmansial477"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X / Twitter"
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#06b6d4]/60 transition-all"
        >
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden>
            <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.844l-5.36-7.01L4.6 22H1.34l8.02-9.16L1 2h7.02l4.84 6.4L18.244 2zm-2.4 18h1.9L7.24 4H5.23l10.614 16z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}