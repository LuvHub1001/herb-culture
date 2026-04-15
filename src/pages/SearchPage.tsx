import { Suspense } from "react";
import { Link } from "react-router-dom";
import { SearchBar, SearchFetch } from "../components";
import EventGrid from "../components/event/EventGrid";

function SearchPage() {
  return (
    <>
      <SearchBar />

      <div className="mx-auto mt-6 w-full max-w-6xl px-4 md:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--text-muted)] transition-colors hover:text-[var(--text)]"
        >
          <svg
            aria-hidden
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          메인으로
        </Link>
      </div>

      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-6xl px-4 py-10 md:px-6">
            <EventGrid events={[]} loading skeletonCount={12} />
          </section>
        }
      >
        <SearchFetch />
      </Suspense>
    </>
  );
}

export default SearchPage;
