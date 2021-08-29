export function removeConsecutiveCommas(str: string): string {
  return str.replace(/(,)\1+/g, '');
}
