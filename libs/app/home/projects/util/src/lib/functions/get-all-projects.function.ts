// @ts-ignore
import * as fs from 'fs';
// @ts-ignore
import * as path from 'path';
import { isProject } from './is-project.function';
import { getProjectName } from './get-project-name.function';
import { Project } from '@nx-cli/client/projects/data-access/store';
import { trimToRelativePath } from './trim-to-relative-path.function';
import { getProjectType } from './get-project-type.function';
import { getAngularModules } from './get-angular-modules.function';

export function getAllProjects(pwd: string, rootPath: string): Project[] {
  let projects: Project[] = [];
  let matchingNameCounter = 0;
  const files = fs.readdirSync(pwd);

  files.forEach((file: string) => {
    const absolutePath = path.join(pwd, file);
    const isFileDirectory = fs.statSync(absolutePath).isDirectory();

    if (isFileDirectory && !file.includes('node_modules') && !file.includes('dist')) {
      projects = [...projects, ...getAllProjects(absolutePath, rootPath)];
    } else if (isProject(file, files)) {
      matchingNameCounter++;
    }

    if (matchingNameCounter > 1) {
      projects.push({
        name: getProjectName(pwd),
        path: pwd,
        relativePath: trimToRelativePath(pwd, rootPath),
        type: getProjectType(pwd, rootPath),
        nameInNxJson: '',
        angularModules: getAngularModules(pwd),
        tags: []
      });

      matchingNameCounter = 0;
    }
  });

  return projects;
}
