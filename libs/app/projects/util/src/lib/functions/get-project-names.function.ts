import * as fs from 'fs-extra';

import { trimToRelativePath } from './trim-to-relative-path.function';
import { Project } from '@nx-cli/client/projects/data-access';
import { getPlatformPathSeparator, parsePath } from '@nx-cli/app/shared/util';

interface ObjWithRootField {
  root: string;
}

export async function getProjectsNames(workspacePath: string, file: string, projects: Project[]): Promise<void> {
  const filePath = `${workspacePath}${getPlatformPathSeparator()}${file}`;
  const fileAsJson = await fs.readJSON(filePath);

  Object.entries(fileAsJson.projects).forEach(([key, value]) => {
    const currentProjectPath = parsePath((value as ObjWithRootField).root);

    projects.forEach((project) => {
      const trimmedPath = parsePath(trimToRelativePath(project.path, workspacePath).substring(1));

      if (currentProjectPath === trimmedPath) {
        project.nameInNxJson = key;
      }
    });

  });
}
