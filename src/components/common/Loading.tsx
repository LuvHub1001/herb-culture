import { memo } from "react";

function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--accent-soft)] border-t-[var(--accent)]"
        role="status"
        aria-label="loading"
      />
    </div>
  );
}

export default memo(Loading);
