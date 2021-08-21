// @ts-ignore
import os from 'os';

export function getPlatformPathSeparator(): string {
  const platform = os.platform();

  switch (platform) {
    case 'win32':
      return '\\';
    default:
      return '/';
  }
}
