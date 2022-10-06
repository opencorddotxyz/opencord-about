import { isBrowser } from "./ssr";
import * as Bowser from "bowser";

const browser = isBrowser()
  ? Bowser.getParser(window.navigator.userAgent)
  : undefined;

export function isDesktop() {
  return browser?.getPlatformType() === "desktop";
}

export const isDesktopVal = isDesktop();

export function isIos() {
  if (isDesktop()) {
    return false;
  }

  let u = navigator.userAgent;
  let iOs = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  return iOs;
}
