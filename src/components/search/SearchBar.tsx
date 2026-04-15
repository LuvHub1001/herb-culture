import { memo, useCallback } from "react";
import { useSearch } from "../../hooks";

function SearchBar() {
  const { searchKeyword, handleSearchButton, handleKeyDown, setSearchKeyword } =
    useSearch();

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setSearchKeyword(e.target.value),
    [setSearchKeyword],
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 md:px-6">
      <div className="relative -mt-7 flex items-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5 md:-mt-9">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="pointer-events-none absolute left-4 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          className="w-full rounded-2xl bg-transparent py-4 pl-12 pr-28 text-base font-medium outline-none placeholder:font-medium placeholder:text-gray-400 md:py-5 md:text-lg"
          placeholder="전시, 콘서트, 축제를 검색해보세요"
          value={searchKeyword}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          aria-label="search"
        />
        <button
          type="button"
          onClick={handleSearchButton}
          className="absolute right-2 rounded-xl bg-[var(--text)] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-black md:px-5 md:py-2.5"
        >
          검색
        </button>
      </div>
    </div>
  );
}

export default memo(SearchBar);
