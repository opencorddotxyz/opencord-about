export const vw = (px: number): string => {
  return `${((px / 750) * 100).toFixed(3)}vw`;
};

export const vh = (px: number): string => {
  return vw(px);
};

export function vh2px(value: number) {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return (y * value) / 100;
}

export function vw2PX(value: number) {
  return vw2px((value / 750) * 100);
}

export function vw2px(value: number) {
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  return (x * value) / 100;
}

export function vwPx(px: number) {
  return px;
  const _vw = (px / 1440) * 100;
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  return (x * _vw) / 100;
}

export function vwPX(px: number) {
  return px + "px";
  const _vw = (px / 1440) * 100;
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth;
  return `${((x * _vw) / 100).toFixed(0)}px`;
}

export function vhPx(px: number) {
  const _vh = (px / 780) * 100;
  const w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName("body")[0],
    y = w.innerHeight || e.clientHeight || g.clientHeight;
  return (y * _vh) / 100;
}
