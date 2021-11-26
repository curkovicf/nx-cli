// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace StringUtils {
  export function addBackslashAtEndIfNotThere(inputString: string): string {
    return inputString.charAt(inputString.length - 1) === '/'
      ? inputString
      : `${inputString}/`;
  }

  export function removeConsecutiveCommas(str: string): string {
    return str.replace(/(,)\1+/g, '');
  }

  export function removeSpecialCharFrontBack(str: string): string {
    let parsedString = str;

    //  Check if first char is not a letter
    if (str.charAt(0).match(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g)) {
      parsedString = parsedString.substring(1);
    }

    //  Check if last char is not a letter
    if (str.charAt(str.length - 1).match(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g)) {
      parsedString = parsedString.slice(0, -1);
    }

    return parsedString;
  }

  export function removeSpecialCharacters(str: string): string {
    return str.replace(/[~`!@#$%^&*()+={}\[\];:\'\"<>.,\/\\\?-_]/g, '');
  }
}
