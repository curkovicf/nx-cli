import * as fs from 'fs';
import * as path from 'path';

import { NxApp, NxLibrary, NxLibraryType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';
import { IpcEventDtos } from '@dev-workspace/nx-cli/shared/data-events';

export class ProjectsEventHandler {
  private apps: NxApp[] = [];
  private libs: NxLibrary[] = [];

  constructor(private initialPath: string) {}

  public findProjects(pwd: string): IpcEventDtos.Projects {
    const files = fs.readdirSync(pwd);

    let matchingNameCounter = 0;

    files.forEach(file => {
      const absolutePath = path.join(pwd, file);
      const isFileDirectory = fs.statSync(absolutePath).isDirectory();

      if (isFileDirectory && !file.includes('node_modules')) {
        this.findProjects(absolutePath);
      } else if (this.isProject(file, files)) {
        matchingNameCounter++;
      }

      if (matchingNameCounter > 1) {
        if (this.isApp(pwd)) {
          this.apps.push({ name: this.getProjectName(pwd), path: pwd });
        } else {
          this.libs.push({ name: this.getProjectName(pwd), path: pwd, type: this.getLibraryType(pwd) });
          this.getLibraryType(pwd);
        }
      }

    });

    return { apps: this.apps, libs: this.libs };
  }

  private isApp(pwd: string): boolean {
    const trimmedPath = pwd.replace(this.initialPath,'');
    return trimmedPath.split('/')[1] === 'apps';
  }

  private isProject(file: string, files: string[]): boolean {
    return file.toString() === 'tsconfig.json' ||
      file.toString() === 'tsconfig.json' ||
      file.toString() === 'tsconfig.spec.json' &&
      files.includes('src');
  }

  private getLibraryType(pwd: string): NxLibraryType | undefined {
    const libraryTypes = Object.values(NxLibraryType);
    const trimmedPath = pwd.replace(this.initialPath,'');
    const keywords = trimmedPath
      .split('/')
      .filter(item => item !== '' && item !== '/')
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

  private getProjectName(pwd: string): string {
    const splittedPath = pwd.split('/');
    return splittedPath[splittedPath.length - 1];
  }
}
