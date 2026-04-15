import { memo } from "react";

function Footer() {
  return (
    <footer className="mt-20 w-full border-t border-[var(--border)] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-8 text-sm font-semibold text-[var(--text-muted)] md:flex-row">
        <span>© {new Date().getFullYear()} Herb Corp.</span>
        <span className="text-xs font-medium">
          Data · Seoul Open Data · Kakao Local
        </span>
      </div>
    </footer>
  );
}

export default memo(Footer);
