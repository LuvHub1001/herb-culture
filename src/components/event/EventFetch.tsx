import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useAtom } from "jotai";
import {
  buttonGuAtom,
  categoryAtom,
  sortAtom,
} from "../../jotai/atom";
import type { SortKey } from "../../jotai/atom";
import { get } from "../../apis";
import { useFetch, usePagination } from "../../hooks";
import { EventType } from "../../types/EventType";
import { getEnd, getStart, isOngoing } from "../../lib/date";
import { CodeData } from "../../lib/Event";
import Pagination from "../etc/Pagination";
import SortSelect from "../etc/SortSelect";
import EventGrid from "./EventGrid";

const PAGE_SIZE = 12;
const BATCH_SIZE = 1000;

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "newest", label: "최신순" },
  { value: "endSoon", label: "종료 임박순" },
];

interface ChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const CategoryChip = memo(function CategoryChip({
  label,
  active,
  onClick,
}: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-bold transition-colors ${
        active
          ? "border-[var(--text)] bg-[var(--text)] text-white hover:bg-black"
          : "border-[var(--border)] bg-white text-[var(--text)] hover:border-gray-400 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
});

function EventFetch() {
  const [buttonGu] = useAtom(buttonGuAtom);
  const [category, setCategory] = useAtom(categoryAtom);
  const [sort, setSort] = useAtom(sortAtom);

  const [allEvents, setAllEvents] = useState<EventType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const totalCountRes = useFetch(get, `/culturalEventInfo/1/1`);
  const totalDataCount: number | undefined =
    totalCountRes?.data?.culturalEventInfo?.list_total_count;

  useEffect(() => {
    if (!totalDataCount) return;
    let cancelled = false;

    (async () => {
      const totalRequests = Math.ceil(totalDataCount / BATCH_SIZE);
      const promises = Array.from({ length: totalRequests }, (_, i) => {
        const start = i * BATCH_SIZE + 1;
        const end = Math.min((i + 1) * BATCH_SIZE, totalDataCount);
        // 모바일 느린 망에서 1000건 응답이 기본 8s 안에 못 오는 경우 대비
        return get(`/culturalEventInfo/${start}/${end}`, { timeout: 30000 });
      });

      try {
        // 일부 배치가 실패해도 성공한 배치라도 노출
        const results = await Promise.allSettled(promises);
        if (cancelled) return;
        const flat = results.flatMap((r) =>
          r.status === "fulfilled"
            ? (r.value?.data?.culturalEventInfo?.row ?? [])
            : [],
        );
        setAllEvents(flat);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [totalDataCount]);

  const selectedGu = buttonGu;

  const filteredEvents = useMemo(() => {
    let list = allEvents.filter((e) => isOngoing(e.DATE));
    if (selectedGu) list = list.filter((e) => e.GUNAME === selectedGu);
    if (category)
      list = list.filter((e) => (e.CODENAME ?? "").includes(category));
    if (sort === "endSoon") {
      list = [...list].sort((a, b) => getEnd(a.DATE) - getEnd(b.DATE));
    } else {
      list = [...list].sort((a, b) => getStart(b.DATE) - getStart(a.DATE));
    }
    return list;
  }, [allEvents, selectedGu, category, sort]);

  const totalItems = filteredEvents.length;

  const { currentPage, setCurrentPage } = usePagination({
    totalItems,
    divider: PAGE_SIZE,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedGu, setCurrentPage]);

  const pagedEvents = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredEvents.slice(start, start + PAGE_SIZE);
  }, [filteredEvents, currentPage]);

  const gridTopRef = useRef<HTMLDivElement | null>(null);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPage(page);
      gridTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [setCurrentPage],
  );

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
      <div ref={gridTopRef} className="scroll-mt-6" />
      <div className="mb-5">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
          {selectedGu ? `${selectedGu} 문화행사` : "서울시 문화행사"}
        </h2>
        <p className="mt-1 text-sm font-semibold text-[var(--text-muted)]">
          총 {totalItems.toLocaleString()}건
        </p>

        <div className="no-scrollbar -mx-4 mt-4 overflow-x-auto px-4 md:mx-0 md:px-0">
          <div className="flex flex-nowrap gap-2 md:flex-wrap">
            <CategoryChip
              label="전체"
              active={category === null}
              onClick={() => setCategory(null)}
            />
            {CodeData.map((name) => (
              <CategoryChip
                key={name}
                label={name}
                active={category === name}
                onClick={() => setCategory(name)}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <SortSelect<SortKey>
            value={sort}
            options={SORT_OPTIONS}
            onChange={setSort}
          />
        </div>
      </div>

      <EventGrid events={pagedEvents} loading={isLoading} />

      {totalItems > PAGE_SIZE && (
        <Pagination
          key={selectedGu ?? "all"}
          totalItems={totalItems}
          divider={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

export default EventFetch;
