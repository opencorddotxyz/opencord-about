import { getDeviceId, getLang, getPlatform, getTZ, getVersion } from "@/utils";
import { AxiosInstance } from "axios";

import { Cookies } from "react-cookie";
export const applyDeviceInterceptor = (axios: AxiosInstance): void => {
  if (!axios.interceptors) {
    throw new Error(`invalid axios instance: ${axios}`);
  }

  axios.interceptors.request.use((request) => {
    const cookie = new Cookies();
    request.headers = {
      ...request.headers,
      "oc-device-id": cookie.get("oc-device-id") ?? getDeviceId(),
      "oc-client-lang": cookie.get("oc-client-lang") ?? getLang(),
      "oc-client-tz": cookie.get("oc-client-tz") ?? getTZ(),
      "oc-client-version": cookie.get("oc-client-version") ?? getVersion(),
      "oc-client-platform": cookie.get("oc-client-platform") ?? getPlatform(),
    };

    return request;
  });
};
