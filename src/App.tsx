import { ErrorBoundary } from "./components";
import PublicRouter from "./routers/PublicRouter";
import "./App.css";

function App() {
  return (
    <ErrorBoundary>
      <PublicRouter />
    </ErrorBoundary>
  );
}

export default App;
