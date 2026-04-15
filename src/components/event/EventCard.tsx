import { memo } from "react";
import { EventType } from "../../types/EventType";

interface Props {
  event: EventType;
  eager?: boolean;
}

function EventCard({ event, eager = false }: Props) {
  return (
    <a
      href={event.ORG_LINK || event.HMPG_ADDR || "#"}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white transition-colors hover:border-gray-400"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-gray-100">
        <img
          src={event.MAIN_IMG}
          alt={event.TITLE}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
          className="h-full w-full object-cover"
        />
        <span className="absolute left-3 top-3 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm">
          {event.CODENAME}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="line-clamp-3 text-base font-bold leading-snug text-[var(--text)] md:text-lg">
          {event.TITLE}
        </h3>
        <p className="truncate text-xs font-medium text-[var(--text-muted)]">
          <span className="mr-1">📍</span>
          {event.GUNAME} · {event.PLACE}
        </p>
        <p className="truncate text-xs font-medium text-[var(--text-muted)]">
          <span className="mr-1">🗓</span>
          {event.DATE}
        </p>
        {event.USE_FEE ? (
          <p className="mt-auto truncate pt-1 text-xs font-bold text-[var(--accent)]">
            {event.USE_FEE}
          </p>
        ) : null}
      </div>
    </a>
  );
}

export default memo(EventCard);
