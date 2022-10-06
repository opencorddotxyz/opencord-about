import axios, { AxiosError, AxiosResponse } from "axios";

import { error, info } from "@/utils";

import { applyDeviceInterceptor } from "./interceptors/device";
import {
  applyAuthTokenInterceptor,
  clearAuthTokens,
  getAccessToken,
} from "./interceptors/token";
import { applyTryInterceptor } from "./interceptors/try";

type Param = {
  [k: string]: any;
};

type ComposedResponse<T> = AxiosResponse<T> & BussinessInfo;

type ClientFuncWithPathParam = <T = any, R = ComposedResponse<T>>(
  url: string,
  pathParam?: Param,
  param?: Param
) => Promise<R>;

type Client = {
  get: ClientFuncWithPathParam;
  head: ClientFuncWithPathParam;
  options: ClientFuncWithPathParam;
  delete: ClientFuncWithPathParam;
  post: ClientFuncWithPathParam;
  put: ClientFuncWithPathParam;
  patch: ClientFuncWithPathParam;
};

type BussinessInfo = {
  code: number;
  message: string;
  title: string;
  ok: string;
};

type SupportTypes = keyof Client;

const instance = axios.create({ baseURL: process.env.NEXT_PUBLIC_BASE_URL });
const supportMethods = [
  "get",
  "head",
  "options",
  "delete",
  "post",
  "put",
  "patch",
];

applyAuthTokenInterceptor(instance);
applyTryInterceptor(instance);
applyDeviceInterceptor(instance);

function repalcePathParams(path: string, param: Param) {
  const restParam = { ...param };
  let parsedPath = path;

  Object.entries(param).forEach(([k, v]) => {
    if (parsedPath?.includes(`:${k}`)) {
      Reflect.deleteProperty(restParam, k);
    }
    parsedPath = parsedPath.replace(`:${k}`, encodeURIComponent(v));
  });

  return {
    parsedPath,
    restParam,
  };
}

async function withTransformData<T = any>(
  url: string,
  pathParam?: Param,
  param?: Param,
  method: SupportTypes = "get"
): Promise<ComposedResponse<T>> {
  const { parsedPath, restParam } = repalcePathParams(url, pathParam || {});

  let response = {} as ComposedResponse<T>;
  info("opencord http <=", {
    url,
    param: JSON.stringify({
      pathParam,
      param,
    }),
  });

  try {
    if (method === "delete") {
      response = await instance[method](parsedPath, {
        data: { ...restParam, ...param },
      });
    } else {
      if (
        ["get", "head", "options"].findIndex((v) => {
          return v === method;
        }) !== -1
      ) {
        response = await instance[method](parsedPath, {
          params: { ...restParam, ...(param || {}) },
        });
      } else {
        response = await instance[method](parsedPath, {
          ...restParam,
          ...(param || {}),
        });
      }
    }
  } catch (err) {
    const errResponse = (err as AxiosError).response as AxiosResponse<any>;
    if (errResponse?.status === 401) {
      // clearAuthTokens();
      // if (location.pathname !== "/") {
      //   location.replace("/");
      // }
    } else if (errResponse?.data?.code) {
      // deal with logic that with a none 2XX http status but with code
      response.code = errResponse?.data.code;
      response.message = errResponse?.data.message;
    } else {
      // deal with logic with node success status, and without code,
      // maybe show alert info later
      error("opencord http error =>", {
        url,
        err,
      });
      throw err;
    }
  }
  info("opencord http =>", {
    url,
    response: JSON.stringify(response),
  });

  return response;
}

const client = {} as Client;
supportMethods.forEach((method) => {
  client[method as SupportTypes] = (
    url: string,
    pathParam?: Param,
    bodyParam?: Param
  ) => {
    return withTransformData(
      url,
      pathParam,
      bodyParam,
      method as SupportTypes
    ) as Promise<any>;
  };
});

export { getAccessToken };

export default client;
