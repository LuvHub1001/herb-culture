import { Suspense } from "react";
import { ErrorBoundary, Loading, EventFetch } from "./components";
import PublicRouter from "./routers/PublicRouter";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}></Suspense>
      <EventFetch />
    </ErrorBoundary>
  );
}

export default App;
