function apiErrorHandler(
  funcName: string,
  err: Error,
  signal: AbortSignal
): never {
  if ("aborted" in signal && signal.aborted) {
    throw new Error(`${funcName} aborted`);
  }
  throw new Error(`${funcName} falsed: ${err}`);
}
//---------------------------------------------------------------------------
function copyByValue(value: any): any {
  /*
    use recursive strategy to perform a deep copy by value of any type of variable.
    meant to handle deep nested variables that shallow javascript copy functions cannot perform.
  */
  let cloneValue: any;

  // handle the primitive data types, and null/undefined
  if (value === null || value === undefined) {
    return value;
  }

  // handle array
  if (value instanceof Array) {
    cloneValue = [];
    for (let i = 0; i < value.length; i += 1) {
      cloneValue[i] = copyByValue(value[i]);
    }
    return cloneValue;
  }

  // handle object
  if (value instanceof Object) {
    cloneValue = {};
    for (const attr in value) {
      if (attr in value) {
        cloneValue[attr] = copyByValue(value[attr]);
      }
    }
  }

  // handle date
  if (value instanceof Date) {
    cloneValue = new Date();
    cloneValue.setTime(value.getTime());
    return cloneValue;
  }

  // handle set
  if (value instanceof Set) {
    cloneValue = new Set();
    value.forEach((val: any) => cloneValue.add(copyByValue(val)));
    return cloneValue;
  }

  throw new Error("Unable to clone by value! Value type is not supported.");
}
//---------------------------------------------------------------------------
function getODataSafeStr(str: string): string {
  return str.replace("'", "''").toLowerCase();
}
//---------------------------------------------------------------------------
function getStrFirstLetterLowerCase(str: string): string {
  return str.charAt(0).toLocaleLowerCase() + str.slice(1);
}
//---------------------------------------------------------------------------
function isObjectEmpty(obj: object): boolean {
  if (typeof obj !== "object" || obj === null || obj === undefined) {
    return true;
  }

  for (const prop in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }
  }

  return JSON.stringify(obj) === JSON.stringify({});
}
//---------------------------------------------------------------------------
function isStringJson(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e: unknown) {
    return false;
  }
  return true;
}
//---------------------------------------------------------------------------
function sleep(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export {
  apiErrorHandler,
  copyByValue,
  getODataSafeStr,
  getStrFirstLetterLowerCase,
  isObjectEmpty,
  isStringJson,
  sleep,
};
