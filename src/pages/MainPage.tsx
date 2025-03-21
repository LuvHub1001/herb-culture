import { Suspense } from "react";
import { SearchBar, EventFetch, AddressButton, Loading } from "../components";

function MainPage() {
  return (
    <>
      <SearchBar />
      <AddressButton />
      <Suspense fallback={<Loading />}>
        <EventFetch />
      </Suspense>
    </>
  );
}
export default MainPage;
