export function isNaN(e: unknown): boolean {
  return Number.isNaN(e);
}

export function isNullOrUnderfined(e: unknown): boolean {
  return typeof e === 'undefined' || e === null;
}

export function isEmptyArray(e: unknown): boolean {
  if (!isArray(e)) {
    return true;
  }

  return (e as Array<any>).length === 0;
}

export function isEmptyStringOrWhitespace(e: unknown): boolean {
  if (!isString(e)) {
    return true;
  }

  return (e as string).trim() === '';
}

export function isEmptyObject(e: Record<string, unknown>): boolean {
  if (JSON.stringify(e) === '{}') {
    return true;
  }

  return false;
}

export function isEmpty(e: unknown): boolean {
  if (typeof e === 'undefined' || e === null) {
    return typeof e === 'undefined' || e === null;
  }

  if (typeof e === 'boolean') {
    return false;
  }

  if (isArray(e)) {
    return isEmptyArray(e);
  }

  if (isString(e)) {
    return isEmptyStringOrWhitespace(e);
  }

  if (e instanceof Object) {
    return isEmptyObject(e as Record<string, unknown>);
  }

  return false;
}

export function isNotEmpty(e: unknown): boolean {
  return !isEmpty(e);
}

export function isNumber(e: unknown): boolean {
  return typeof e === 'number';
}

export function isString(e: unknown): boolean {
  return typeof e === 'string';
}

export function isStringNumber(e: unknown): boolean {
  if (!isString(e)) {
    return false;
  }

  const number = Number(e);

  return !isNaN(number);
}

export function isIntString(e: unknown): boolean {
  if (!isString(e)) {
    return false;
  }

  const number = Number(e);

  return !isNaN(number) && Number.isInteger(number);
}

export function isArray(e: any): e is any[] {
  return Array.isArray(e);
}

export function isObject(e: unknown): e is object {
  return Object.prototype.toString.call(e) === '[object Object]';
}

export function isDate(e: unknown): boolean {
  return e instanceof Date;
}

const defaultNoCheckRouter = ['/invite'];
export function isNoCheckRouter(
  router: any,
  NotCheckRouter: string[] = defaultNoCheckRouter,
) {
  if (!router || isEmpty(router)) {
    return false;
  }
  const { pathname } = router;

  for (let i = 0; i < NotCheckRouter.length; i++) {
    const key = NotCheckRouter[i];
    if (pathname.startsWith(key)) {
      return true;
    }
  }

  return false;
}
