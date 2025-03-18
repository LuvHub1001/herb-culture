import { useState } from "react";

const useAsyncError = () => {
  const [_, _setError] = useState<Error | null>(null);

  const catchAsyncError = (err: Error | null) => {
    _setError(() => {
      throw err;
    });
  };

  return { catchAsyncError };
};

export default useAsyncError;
