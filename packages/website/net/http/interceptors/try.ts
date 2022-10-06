import { AxiosInstance } from 'axios';

export const applyTryInterceptor = (axios: AxiosInstance): void => {
  if (!axios.interceptors) {
    throw new Error(`invalid axios instance: ${axios}`);
  }

  axios.interceptors.response.use((response) => {
    if (!response.data) {
      response.data = {};
    }

    return response;
  });
};
