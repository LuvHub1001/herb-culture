import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout } from "../hoc";
import { Loading } from "../components";

const MainPage = lazy(() => import("../pages/MainPage"));
const WrappedMainPage = withCommonLayout(MainPage);

const SearchPage = lazy(() => import("../pages/SearchPage"));
const WrappedSearchPage = withCommonLayout(SearchPage);

function PublicRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedMainPage />} />
          <Route path="/search" element={<WrappedSearchPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default PublicRouter;
