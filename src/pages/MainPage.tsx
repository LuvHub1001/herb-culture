import { Suspense } from "react";
import {
  SearchBar,
  EventFetch,
  AddressButton,
  EventSkeleton,
  Loading,
} from "../components";

function MainPage() {
  return (
    <>
      <SearchBar />
      <Suspense fallback={<Loading />}>
        <AddressButton />
      </Suspense>
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
