// @ts-ignore
import os from 'os';

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
