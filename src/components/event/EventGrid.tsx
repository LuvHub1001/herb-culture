import { memo } from "react";
import { EventType } from "../../types/EventType";
import EventCard from "./EventCard";
import EventSkeleton from "./EventSkeleton";

interface Props {
  events: EventType[];
  loading?: boolean;
  skeletonCount?: number;
  emptyMessage?: string;
}

function EventGrid({
  events,
  loading = false,
  skeletonCount = 12,
  emptyMessage = "표시할 행사가 없습니다.",
}: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }, (_, i) => (
          <EventSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!events.length) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[var(--text-muted)]">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event, i) => (
        <EventCard
          key={`${event.TITLE}-${event.DATE}-${event.PLACE}-${i}`}
          event={event}
          eager={i < 4}
        />
      ))}
    </div>
  );
}

export default memo(EventGrid);
