import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  isAxiosError,
  HttpStatusCode,
  AxiosResponse,
} from "axios";

const AXIOS_TIMEOUT = 8000;
const RETRY_TIMEOUT = 1000;
const RETRY_MAX_COUNT = 3;
let RETRY_COUNT = 0;

const baseURL =
  import.meta.env.MODE === "production"
    ? `/api/${import.meta.env.VITE_API_KEY}/json`
    : "http://openapi.seoul.go.kr:8088/" +
      import.meta.env.VITE_API_KEY +
      "/json";

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: AXIOS_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (req) => {
    if (req.data instanceof FormData) {
      req.headers["Content-Type"] = "multipart/form-data";
    }
    return req;
  },
  (err: Error) => {
    if (isAxiosError(err)) {
      switch (err.status) {
        case HttpStatusCode.NotFound: {
          console.log(
            `CANNOT FOUND ENDPOINT <REQ> :: ${err.config?.baseURL} ${err.config?.url}`,
          );
          break;
        }

        case HttpStatusCode.BadRequest: {
          console.log(
            `BAD REQUEST <REQ> :: ${err.config?.headers} ${err.config?.data}`,
          );
          break;
        }

        default: {
          console.log(`AXIOS ERROR <REQ> :: ${err.message} ${err.status}`);
          break;
        }
      }
    } else throw err;
  },
);

axiosInstance.interceptors.response.use(
  (res) => {
    RETRY_COUNT = 3;
    return res;
  },
  (err: Error) => {
    if (isAxiosError(err)) {
      switch (err.response?.status) {
        case HttpStatusCode.NotFound: {
          console.log(
            `CANNOT FOUND ENDPOINT <RES> :: ${err.config?.baseURL} ${err.config?.url}`,
          );
          break;
        }

        case HttpStatusCode.Unauthorized: {
          console.log(`UNAUTHORZIED <RES> :: ${err.config?.headers}`);
          break;
        }

        case HttpStatusCode.Forbidden: {
          console.log(`FORBIDDEN <RES> :: ${err.config?.headers}`);
          break;
        }

        case HttpStatusCode.BadGateway: {
          while (RETRY_COUNT++ < RETRY_MAX_COUNT) {
            backoffRequest(
              RETRY_TIMEOUT * RETRY_COUNT,
              err.config as InternalAxiosRequestConfig,
            );
          }

          console.log(`BADGATEWAY <RES> :: ${err.config?.headers}`);
          break;
        }

        default: {
          console.log(`AXIOS ERROR <RES> :: ${err.message} ${err.status}`);
        }
      }
    } else throw err;
  },
);

const backoffRequest = async (
  times: number,
  config: InternalAxiosRequestConfig,
) => {
  setTimeout(async () => {
    axiosInstance.request(config);
  }, times);
};

export const get = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.get<T>(url, config);
};

export const post = async <T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.post<T>(url, data, config);
};

export const patch = async <T = any>(
  url: string,
  data: any,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.patch<T>(url, data, config);
};

export const remove = async <T = any>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  return await axiosInstance.delete<T>(url, config);
};
