import { Suspense } from "react";
import { ErrorBoundary } from "./components";
import PublicRouter from "./routers/PublicRouter";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <Suspense>
        <PublicRouter />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
