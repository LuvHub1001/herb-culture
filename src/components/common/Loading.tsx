import { CircularProgress } from "@mui/material";

function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <CircularProgress />
    </div>
  );
}

export default Loading;
