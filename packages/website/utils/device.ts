import DeviceDetector from 'device-detector-js';
import { v4 as uuidv4 } from 'uuid';

import { Lang } from '@/constant/lang';

import packageInfo from '../package.json';
import { getLocal, setLocal } from '.';
import { isBrowser } from './ssr';

type ValueOf<T> = T[keyof T];
type DValue = string | number | boolean;

const DeviceIdkey = 'opencord_device_id';
const LangKey = 'opencord_lang';
const TimezoneKey = 'opencord_timezone';
const ClientVersionKey = 'opencord_client_version';
const PlatformKey = 'opencord_platform';
const BrandKey = 'opencord_brand';
const ModelKey = 'opencord_model';
const DisplayKey = 'opencord_display';
const PixelRatioKey = 'opencord_pixel_ratio';
const OSKey = 'opencord_os';

const Cache: { [key: string]: DValue } = {};

const deviceDetector = new DeviceDetector();
const info = deviceDetector.parse(isBrowser() ? navigator.userAgent : '');
const UnknownValue = 'unknown';

function getValue(key: string, fallback: () => DValue) {
  let value: DValue = Cache[key];
  if (value) {
    return value;
  }

  value = getLocal(key) || '';
  Cache[key] = value;
  if (value) {
    return value;
  }

  value = fallback();
  if (value) {
    Cache[key] = value;
    setLocal(key, value);
  }

  return value;
}

function setValue(key: string, value: string) {
  Cache[key] = value;
  setLocal(key, value);
}

export function getDeviceId() {
  return getValue(DeviceIdkey, () => {
    return uuidv4();
  }) as unknown as string;
}

export function getLang() {
  return getValue(LangKey, () => {
    return Lang['English, US'];
  });
}

export function setLang(value: ValueOf<typeof Lang>) {
  setValue(LangKey, value);
}

export function getTZ() {
  return getValue(TimezoneKey, () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  });
}

export function getVersion() {
  return getValue(ClientVersionKey, () => {
    return packageInfo.version;
  });
}

export function getPlatform() {
  return getValue(PlatformKey, () => {
    return 'Web';
  });
}

export function getBrand() {
  return getValue(BrandKey, () => {
    return info.device?.brand || UnknownValue;
  });
}

export function getModel() {
  return getValue(ModelKey, () => {
    return info.client?.name
      ? `${info.client.name} ${info.client.version}`
      : UnknownValue;
  });
}

export function getDisplay() {
  return getValue(DisplayKey, () => {
    return `${window.screen.width}x${window.screen.height}`;
  });
}

export function getPixelRatio() {
  const dpr = getValue(PixelRatioKey, () => {
    return `${window.devicePixelRatio}`;
  });

  if (!dpr) {
    return '';
  }

  return dpr;
}

export function getOS() {
  return getValue(OSKey, () => {
    return info.os?.name ? `${info.os.name} ${info.os.version}` : UnknownValue;
  });
}

export const kIsMac = info.os?.name?.toLowerCase()?.includes('mac');
export const kIsWindows = info.os?.name?.toLowerCase()?.includes('windows');
export const kIsPc = kIsMac || kIsWindows;

export const kIsIos = info.os?.name.toLowerCase()?.includes('ios');
export const kIsAndroid = info.os?.name.toLowerCase()?.includes('android');
