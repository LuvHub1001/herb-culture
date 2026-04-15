import { memo, useCallback } from "react";
import { usePagination } from "../../hooks";

interface PaginationProps {
  totalItems: number;
  divider: number;
  onPageChange: (page: number) => void;
}

function Pagination({ totalItems, divider, onPageChange }: PaginationProps) {
  const {
    currentPage,
    isFirstPage,
    isLastPage,
    pageNumbers,
    totalPage,
    setCurrentPage,
  } = usePagination({ totalItems, divider });

  const goTo = useCallback(
    (page: number) => {
      setCurrentPage(page);
      onPageChange(page);
    },
    [setCurrentPage, onPageChange],
  );

  const goFirst = useCallback(() => goTo(1), [goTo]);
  const goLast = useCallback(() => goTo(totalPage), [goTo, totalPage]);
  const goPrev = useCallback(
    () => goTo(Math.max(1, currentPage - 1)),
    [goTo, currentPage],
  );
  const goNext = useCallback(
    () => goTo(Math.min(totalPage, currentPage + 1)),
    [goTo, currentPage, totalPage],
  );

  const baseBtn =
    "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white text-sm text-[var(--text)] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white";

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-1.5"
      aria-label="pagination"
    >
      <button
        type="button"
        className={baseBtn}
        disabled={isFirstPage}
        onClick={goFirst}
        aria-label="first page"
      >
        «
      </button>
      <button
        type="button"
        className={baseBtn}
        disabled={isFirstPage}
        onClick={goPrev}
        aria-label="previous page"
      >
        ‹
      </button>

      {pageNumbers.map((n) => {
        const active = n === currentPage;
        return (
          <button
            key={n}
            type="button"
            onClick={() => goTo(n)}
            aria-current={active ? "page" : undefined}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg text-sm font-bold transition-colors ${
              active
                ? "bg-[var(--text)] text-white hover:bg-black"
                : "border border-[var(--border)] bg-white text-[var(--text)] hover:border-gray-400 hover:bg-gray-50"
            }`}
          >
            {n}
          </button>
        );
      })}

      <button
        type="button"
        className={baseBtn}
        disabled={isLastPage}
        onClick={goNext}
        aria-label="next page"
      >
        ›
      </button>
      <button
        type="button"
        className={baseBtn}
        disabled={isLastPage}
        onClick={goLast}
        aria-label="last page"
      >
        »
      </button>
    </nav>
  );
}

export default memo(Pagination);
