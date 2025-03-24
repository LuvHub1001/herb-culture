import { useState, useCallback, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import { useAsyncError } from "../";

type Nullable<T> = T | null | undefined;

const useFetch = <Params extends string, FetchResult>(
  fetch: (params: Params, config?: AxiosRequestConfig) => Promise<FetchResult>,
  params: Params,
  config?: AxiosRequestConfig,
): Nullable<FetchResult> => {
  const { catchAsyncError } = useAsyncError();

  const [_promise, _setPromise] = useState<Promise<void>>();
  const [_status, _setStatus] = useState<"pending" | "fulfilled" | "error">(
    "pending",
  );
  const [_result, _setResult] = useState<Nullable<FetchResult>>(null);

  const resolve = useCallback((res: FetchResult) => {
    _setStatus("fulfilled");
    _setResult(res);
  }, []);

  useEffect(() => {
    _setStatus("pending");
    _setPromise(
      fetch(params, config)
        .then(resolve)
        .catch((error: Error) => catchAsyncError(error)),
    );
  }, [params]);

  if (_promise && _status === "pending") {
    throw _promise;
  }

  return _result;
};

export default useFetch;
