import store from "store2";

import { isBrowser } from ".";
import { isEmpty } from "./is";

export const getLocal = (key: string) => {
  if (!isBrowser()) {
    return;
  }
  const data = store.get(key);

  return data;
};

export const setLocal = (key: string, data: any) => {
  if (!isBrowser()) {
    return;
  }
  store.set(key, data, true);
};

export const removeLocal = (key: string) => {
  if (!isBrowser()) {
    return;
  }
  store.remove(key);
};

export const clearAllLocal = () => {
  if (!isBrowser()) {
    return;
  }
  store.clearAll();
};

export const keysOfLocal = (): string[] => {
  if (isBrowser()) {
    const keys = store.keys();

    if (isEmpty(keys)) {
      return [];
    }

    return keys;
  }

  return [];
};
