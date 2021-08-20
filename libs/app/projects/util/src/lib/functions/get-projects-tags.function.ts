// @ts-ignore
import * as fs from 'fs';
import { Project } from '@nx-cli/client/projects/data-access/store';

export function getTagsOfAllProjectsWithinNxJsonFile(rootPath: string, projects: Project[]): void {
  const pathToNxJson = rootPath + '/nx.json';
  const nxJson = JSON.parse(fs.readFileSync(pathToNxJson, 'utf8'));

  Object.entries(nxJson.projects).forEach(([key, value]) => {
    projects.forEach((project) => {
      if (project.nameInNxJson === key) {
        // @ts-ignore
        project.tags.push(...value['tags']);
      }
    });
  });
}
