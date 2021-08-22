import { ProjectType } from '@nx-cli/client/projects/data-access';
import { trimToRelativePath } from './trim-to-relative-path.function';
import { getPlatformPathSeparator } from '@nx-cli/app/shared/util';

export function getProjectType(pwd: string, rootPath: string): ProjectType | undefined {
  const libraryTypes = Object.values(ProjectType);
  const keywords = trimToRelativePath(pwd, rootPath)
    .split(getPlatformPathSeparator())
    .filter((item) => item !== '' && item !== '/')
    .reverse();

  for (let index = 0; index < libraryTypes.length; index++) {
    if (keywords[0].includes(libraryTypes[index]) || keywords[1].includes(libraryTypes[index])) {
      return libraryTypes[index];
    }
  }

  return undefined;
}
