import { Suspense } from "react";
import { ErrorBoundary, Loading } from "./components";
import PublicRouter from "./routers/PublicRouter";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}></Suspense>
      <PublicRouter />
    </ErrorBoundary>
  );
}

export default App;
