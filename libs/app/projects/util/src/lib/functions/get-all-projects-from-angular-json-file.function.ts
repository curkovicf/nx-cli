// @ts-ignore
import * as fs from 'fs';

import { Project } from '@nx-cli/client/projects/data-access';
import { trimToRelativePath } from './trim-to-relative-path.function';

export function getProjectsFromAngularJsonFile(rootPath: string, projects: Project[]): void {
  const pathToAngularJson = rootPath + '/angular.json';
  let angularJson;

  try {
    angularJson = JSON.parse(fs.readFileSync(pathToAngularJson, 'utf8'));
  } catch (err) {
    console.warn("ERROR: Couldn't open angular.json");
    return;
  }

  // console.log(angularJson);

  Object.entries(angularJson.projects).forEach(([key, value]) => {
    projects.forEach((project) => {
      const trimmedPath = trimToRelativePath(project.path, rootPath).substring(1);

      if (typeof value === 'string') {
        if (value === trimmedPath) {
          project.nameInNxJson = key;
        }
      } else {
        if ((value as any).root === trimmedPath) {
          project.nameInNxJson = key;
        }
      }
    });
  });
}
