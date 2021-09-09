import * as fs from 'fs-extra';

import { Project } from '@nx-cli/client/projects/data-access';
import { getPlatformPathSeparator } from '@nx-cli/app/shared/util';

interface ObjWithTagsField {
  tags: string[];
}

export async function getTagsOfAllProjectsWithinNxJsonFile(workspacePath: string, projects: Project[]): Promise<void> {
  const pathToNxJson = `${workspacePath}${getPlatformPathSeparator()}nx.json`;
  const nxJson = await fs.readJSON(pathToNxJson);

  Object.entries(nxJson.projects).forEach(([key, value]) => {
    projects.forEach((project) => {
      if (project.nameInNxJson === key) {
        project.tags.push(...(value as ObjWithTagsField).tags);
      }
    });
  });
}
