import { BrowserRouter, Routes, Route } from "react-router-dom";

function PublicRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" />
      </Routes>
    </BrowserRouter>
  );
}

export default PublicRouter;
