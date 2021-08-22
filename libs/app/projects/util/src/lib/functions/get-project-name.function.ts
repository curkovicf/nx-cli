import { getPlatformPathSeparator } from '@nx-cli/app/shared/util';

export function getProjectName(pwd: string): string {
  const splitPath = pwd.split(getPlatformPathSeparator());
  return splitPath[splitPath.length - 1];
}
