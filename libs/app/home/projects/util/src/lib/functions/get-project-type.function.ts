import { ProjectType } from '@nx-cli/client/home/projects/data-access';
import { trimToRelativePath } from './trim-to-relative-path.function';

export function getProjectType(pwd: string, rootPath: string): ProjectType | undefined {
  const libraryTypes = Object.values(ProjectType);
  const keywords = trimToRelativePath(pwd, rootPath)
    .split('/')
    .filter((item) => item !== '' && item !== '/')
    .reverse();

  if (keywords[keywords.length - 1] === 'apps') {
    return ProjectType.app;
  }

  for (let index = 0; index < libraryTypes.length; index++) {
    if (keywords[0].includes(libraryTypes[index]) || keywords[1].includes(libraryTypes[index])) {
      return libraryTypes[index];
    }
  }

  return undefined;
}
