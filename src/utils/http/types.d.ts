import type {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig
} from "axios";

export type resultType = {
  accessToken?: string;
};

export interface HttpResult<T> {
  code:
    | 200
    | 201
    | 202
    | 203
    | 204
    | 500
    | 501
    | 502
    | 503
    | 504
    | 505
    | 400
    | 401
    | 403
    | 404;
  message: string;
  success: boolean;
  data?: T;
}

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put" | "delete" | "patch" | "option" | "head"
>;

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig;
}

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
}

export default class Http {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: P,
    config?: HttpRequestConfig
  ): Promise<T>;
  get<T, P>(
    url: string,
    params?: P,
    config?: HttpRequestConfig
  ): Promise<T>;
}
