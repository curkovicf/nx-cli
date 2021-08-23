// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UtilString {
  export function addBackslashAtEndIfNotThere(inputString: string): string {
    return inputString.charAt(inputString.length - 1) === '/' ? inputString : `${inputString}/`;
  }
}
