import { Suspense } from "react";
import { SearchBar, SearchFetch, EventSkeleton } from "../components";

function SearchPage() {
  return (
    <>
      <SearchBar />
      <Suspense
        fallback={
          <div className="flex w-screen justify-center mt-10">
            <div className="grid w-10/12 grid-cols-5 gap-6">
              {[...Array(10)].map((_, idx) => (
                <EventSkeleton key={idx} />
              ))}
            </div>
          </div>
        }
      >
        <SearchFetch />
      </Suspense>
    </>
  );
}

export default SearchPage;
