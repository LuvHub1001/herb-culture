import { useEffect, useMemo, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { get } from "../../apis";
import { useFetch, usePagination } from "../../hooks";
import { EventType } from "../../types/EventType";
import { CodeData } from "../../lib/Event";
import Pagination from "../etc/Pagination";
import EventGrid from "../event/EventGrid";

const PAGE_SIZE = 12;

function SearchFetch() {
  const location = useLocation();

  const searchKeyword = useMemo(() => {
    return new URLSearchParams(location.search).get("query") ?? "";
  }, [location.search]);

  const isCategory = useMemo(
    () => CodeData.some((category) => searchKeyword.includes(category)),
    [searchKeyword],
  );

  const { currentPage, setCurrentPage } = usePagination({
    totalItems: 0,
    divider: PAGE_SIZE,
  });

  const startIndex = (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = currentPage * PAGE_SIZE;

  const url = useMemo(
    () =>
      isCategory
        ? `/culturalEventInfo/${startIndex}/${endIndex}/${searchKeyword}/`
        : `/culturalEventInfo/${startIndex}/${endIndex}/%20/${searchKeyword}`,
    [isCategory, startIndex, endIndex, searchKeyword],
  );

  const searchRes = useFetch(get, url);

  const totalItems: number =
    searchRes?.data?.culturalEventInfo?.list_total_count ?? 0;
  const results: EventType[] =
    searchRes?.data?.culturalEventInfo?.row ?? [];

  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, setCurrentPage]);

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
      <div className="mb-6">
        <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">
          <span className="text-[var(--accent)]">"{searchKeyword}"</span> 검색 결과
        </h2>
        <p className="mt-1 text-sm font-semibold text-[var(--text-muted)]">
          총 {totalItems.toLocaleString()}건
        </p>
      </div>

      <EventGrid
        events={results}
        emptyMessage={`"${searchKeyword}"에 대한 결과가 없습니다.`}
      />

      {totalItems > PAGE_SIZE && (
        <Pagination
          key={searchKeyword}
          totalItems={totalItems}
          divider={PAGE_SIZE}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
}

export default SearchFetch;
