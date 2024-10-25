import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer
} from "axios";

import type {
  HttpError,
  RequestMethods,
  HttpResponse,
  HttpRequestConfig,
  HttpResult
} from "./types.d";

import { stringify } from "qs";

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const apiPrefix = import.meta.env.BASE_API;
const defaultConfig: AxiosRequestConfig = {
  // 请求超时时间
  timeout: 10000,
  baseURL: apiPrefix,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer
  }
};

class Http {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  /** 初始化配置对象 */
  private static initConfig: HttpRequestConfig = {};

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig): Promise<any> => {
        // 开启进度条动画
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === "function") {
          config.beforeRequestCallback(config);
          return config;
        }
        if (Http.initConfig.beforeRequestCallback) {
          Http.initConfig.beforeRequestCallback(config);
          return config;
        }

        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        const $config = response.config;
        // 关闭进度条动画
        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === "function") {
          $config.beforeResponseCallback(response);
          return response.data;
        }
        if (Http.initConfig.beforeResponseCallback) {
          Http.initConfig.beforeResponseCallback(response);
          return response.data;
        }

        return response.data;
      },
      (error: HttpError) => {
        const $error = error;
        $error.isCancelRequest = Axios.isCancel($error);
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error);
      }
    );
  }

  /** 通用请求工具函数 */
  public request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig
    } as HttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig
  ): Promise<HttpResult<T>> {
    return this.request<HttpResult<T>>("post", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig
  ): Promise<HttpResult<T>> {
    return this.request<HttpResult<T>>("get", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public delete<T>(
    url: string,
    params?: AxiosRequestConfig,
    config?: HttpRequestConfig
  ): Promise<HttpResult<T>> {
    return this.request<HttpResult<T>>("delete", url, params, config);
  }

  /** 单独抽离的`get`工具函数 */
  public put<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: HttpRequestConfig
  ): Promise<HttpResult<T>> {
    return this.request<HttpResult<T>>("put", url, params, config);
  }
}

export const http = new Http();
