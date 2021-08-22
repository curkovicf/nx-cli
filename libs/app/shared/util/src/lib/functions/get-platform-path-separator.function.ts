import { getOs, Platform } from './get-os.function';

export function getPlatformPathSeparator(): string {
  switch (getOs()) {
    case Platform.windows:
      return '\\';
    case Platform.other:
    case Platform.unix:
      return '/';
  }
}
