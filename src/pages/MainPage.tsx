import { Suspense } from "react";
import {
  SearchBar,
  EventFetch,
  AddressButton,
  EventSkeleton,
} from "../components";

function MainPage() {
  return (
    <>
      <SearchBar />
      <AddressButton />
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
        <EventFetch />
      </Suspense>
    </>
  );
}
export default MainPage;
