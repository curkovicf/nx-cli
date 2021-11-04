// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ObjectUtils {
  export function deepCopy<T>(obj: T): T {
    return JSON.parse(JSON.stringify(obj));
  }
}
