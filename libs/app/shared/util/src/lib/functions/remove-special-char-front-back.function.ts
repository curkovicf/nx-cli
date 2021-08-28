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
