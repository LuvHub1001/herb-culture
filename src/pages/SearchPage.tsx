import { Suspense } from "react";
import { SearchBar, SearchFetch, EventSkeleton } from "../components";

function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SearchBar />
      <Suspense
        fallback={
          <div className="flex w-screen justify-center mt-10">
            <div className="grid w-10/12 grid-cols-5 gap-6 max-sm:grid-cols-2 max-sm:p-1 h-auto  max-sm:h-[348px]">
              {[
                ...Array(
                  typeof window !== "undefined" && window.innerWidth < 640
                    ? 4
                    : 10,
                ),
              ].map((_, idx) => (
                <div key={idx} className="h-[380px]">
                  <EventSkeleton />
                </div>
              ))}
            </div>
          </div>
        }
      >
        <SearchFetch />
      </Suspense>
    </div>
  );
}

export default SearchPage;
