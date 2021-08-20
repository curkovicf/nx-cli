// @ts-ignore
import * as fs from 'fs';
import { trimToRelativePath } from './trim-to-relative-path.function';
import { Project } from '@nx-cli/client/projects/data-access';

export function getProjectsFromWorkspaceFile(rootPath: string, projects: Project[]): void {
  const pathToWorkspaceJson = rootPath + '/workspace.json';
  let workspaceJson;

  try {
    workspaceJson = JSON.parse(fs.readFileSync(pathToWorkspaceJson, 'utf8'));
  } catch (err) {
    return;
  }

  Object.entries(workspaceJson.projects).forEach(([key, value]) => {
    // @ts-ignore
    const currentProjectPath = value['root'];

    projects.forEach((project) => {
      const trimmedPath = trimToRelativePath(project.path, rootPath).substring(1);

      if (currentProjectPath === trimmedPath) {
        project.nameInNxJson = key;
      }
    });
  });
}
