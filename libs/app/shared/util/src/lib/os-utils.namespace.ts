// @ts-ignore
import * as os from 'os';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace OsUtils {
  export enum Platform {
    windows,
    unix,
    other
  }

  export function getOs(): Platform {
    switch (os.platform()) {
      case 'win32':
        return Platform.windows;
      case 'darwin':
      case 'linux':
        return Platform.unix;
      default:
        return Platform.other;
    }
  }

  export function getPlatformPathSeparator(): string {
    switch (getOs()) {
      case Platform.windows:
        return '\\';
      case Platform.other:
      case Platform.unix:
        return '/';
    }
  }

  export function parsePath(path: string): string {
    return path.replace(/\\/g, "/");
  }
}
