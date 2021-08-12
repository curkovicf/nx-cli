import * as fs from 'fs';
import * as path from 'path';

import {
  NxProject,
  NxProjectType,
} from '@nx-cli/client/projects/data-access/store';

export class ProjectsEventHandler {
  public projects: NxProject[] = [];

  constructor(private nxProjectRootPath: string) {}

  public findProjects(pwd: string): void {
    const files = fs.readdirSync(pwd);

    let matchingNameCounter = 0;

    files.forEach((file) => {
      const absolutePath = path.join(pwd, file);
      const isFileDirectory = fs.statSync(absolutePath).isDirectory();

      if (isFileDirectory && !file.includes('node_modules')) {
        this.findProjects(absolutePath);
      } else if (this.isProject(file, files)) {
        matchingNameCounter++;
      }

      if (matchingNameCounter > 1) {
        this.projects.push({
          name: this.getProjectName(pwd),
          path: pwd,
          type: this.getProjectType(pwd),
          nameInNxJson: '',
        });
      }
    });
  }

  private isApp(pwd: string): boolean {
    const trimmedPath = pwd.replace(this.nxProjectRootPath, '');
    return trimmedPath.split('/')[1] === 'apps';
  }

  private isProject(file: string, files: string[]): boolean {
    return (
      file.toString() === 'tsconfig.json' ||
      file.toString() === 'tsconfig.json' ||
      (file.toString() === 'tsconfig.spec.json' && files.includes('src'))
    );
  }

  private getProjectType(pwd: string): NxProjectType | undefined {
    const libraryTypes = Object.values(NxProjectType);
    const keywords = this.trimPathToSourcePath(pwd)
      .split('/')
      .filter((item) => item !== '' && item !== '/')
      .reverse();

    for (let index = 0; index < libraryTypes.length; index++) {
      if (
        keywords[0].includes(libraryTypes[index]) ||
        keywords[1].includes(libraryTypes[index])
      ) {
        return libraryTypes[index];
      }
    }

    return undefined;
  }

  private trimPathToSourcePath(pwd: string): string {
    return pwd.replace(this.nxProjectRootPath, '');
  }

  private getProjectName(pwd: string): string {
    const splitPath = pwd.split('/');
    return splitPath[splitPath.length - 1];
  }

  public getNameOfAllProjectsWithinNxJsonFile(): void {
    const pathToWorkspaceJson = this.nxProjectRootPath + '/workspace.json';
    const workspaceJson = JSON.parse(
      fs.readFileSync(pathToWorkspaceJson, 'utf8')
    );

    Object.entries(workspaceJson.projects).forEach(([key, value]) => {
      const currentProjectPath = value['root'];

      this.projects.forEach((project) => {
        const trimmedPath = this.trimPathToSourcePath(project.path).substring(
          1
        );

        if (currentProjectPath === trimmedPath) {
          project.nameInNxJson = key;
        }
      });
    });
  }
}
