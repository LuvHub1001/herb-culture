import { memo } from "react";

function EventSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white">
      <div className="aspect-[4/5] w-full skeleton-shimmer" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-3/4 rounded skeleton-shimmer" />
        <div className="h-3 w-1/2 rounded skeleton-shimmer" />
        <div className="h-3 w-2/3 rounded skeleton-shimmer" />
      </div>
    </div>
  );
}

export default memo(EventSkeleton);
