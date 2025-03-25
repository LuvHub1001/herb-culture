import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { withCommonLayout } from "../hoc";
import { Loading } from "../components";

const MainPage = lazy(() => import("../pages/MainPage"));
const WrappedMainPage = withCommonLayout(MainPage);

function PublicRouter() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WrappedMainPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default PublicRouter;
