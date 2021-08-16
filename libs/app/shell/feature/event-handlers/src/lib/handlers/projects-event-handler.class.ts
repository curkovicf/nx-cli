// @ts-ignore
import * as fs from 'fs';
// @ts-ignore
import * as path from 'path';

import { AngularComponent, AngularModule, Project, ProjectType } from '@nx-cli/client/projects/data-access/store';

export class ProjectsEventHandler {
  public projects: Project[] = [];

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
          relativePath: this.trimToRelativePath(pwd),
          type: this.getProjectType(pwd),
          nameInNxJson: '',
          angularModules: this.getAngularModules(pwd),
          tags: []
        });
      }
    });
  }

  private isProject(file: string, files: string[]): boolean {
    return (
      file.toString() === 'tsconfig.json' ||
      file.toString() === 'tsconfig.json' ||
      (file.toString() === 'tsconfig.spec.json' && files.includes('src'))
    );
  }

  private getProjectType(pwd: string): ProjectType | undefined {
    const libraryTypes = Object.values(ProjectType);
    const keywords = this.trimToRelativePath(pwd)
      .split('/')
      .filter((item) => item !== '' && item !== '/')
      .reverse();

    if (keywords[keywords.length - 1] === 'apps') {
      return ProjectType.app;
    }

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

  private trimToRelativePath(pwd: string): string {
    return pwd.replace(this.nxProjectRootPath, '');
  }

  private getProjectName(pwd: string): string {
    const splitPath = pwd.split('/');
    return splitPath[splitPath.length - 1];
  }

  public getProjectsFromWorkspaceFile(): void {
    const pathToWorkspaceJson = this.nxProjectRootPath + '/workspace.json';
    let workspaceJson;

    try {
      workspaceJson = JSON.parse(fs.readFileSync(pathToWorkspaceJson, 'utf8'));
    } catch (err) {
      return;
    }

    Object.entries(workspaceJson.projects).forEach(([key, value]) => {
      const currentProjectPath = value['root'];

      this.projects.forEach((project) => {
        const trimmedPath = this.trimToRelativePath(project.path).substring(1);

        if (currentProjectPath === trimmedPath) {
          project.nameInNxJson = key;
        }
      });
    });
  }

  public getProjectsFromAngularJsonFile(): void {
    const pathToAngularJson = this.nxProjectRootPath + '/angular.json';
    let angularJson;

    try {
      angularJson = JSON.parse(fs.readFileSync(pathToAngularJson, 'utf8'));
    } catch (err) {
      console.warn('ERROR: Couldn\'t open angular.json');
      return;
    }

    // console.log(angularJson);

    Object.entries(angularJson.projects).forEach(([key, value]) => {
      this.projects.forEach((project) => {
        const trimmedPath = this.trimToRelativePath(project.path).substring(1);

        if (typeof value === 'string') {
          if (value === trimmedPath) {
            project.nameInNxJson = key;
          }
        } else {
          if (value['root'] === trimmedPath) {
            project.nameInNxJson = key;
          }
        }
      });
    });
  }

  public getTagsOfAllProjectsWithinNxJsonFile(): void {
    const pathToNxJson = this.nxProjectRootPath + '/nx.json';
    const nxJson = JSON.parse(fs.readFileSync(pathToNxJson, 'utf8'));

    Object.entries(nxJson.projects).forEach(([key, value]) => {
      this.projects.forEach(project => {
        if (project.nameInNxJson === key) {
          project.tags.push(...value['tags']);
        }
      });
    });
  }

  public getAngularModules(projectPath: string): AngularModule[] {
    const angularModules: AngularModule[] = [];
    const files = fs.readdirSync(projectPath);  //  Open lib

    //  Recursively look for all angular modules
    files.forEach(file => {
      const absolutePath = path.join(projectPath, file);
      const isFileDirectory = fs.statSync(absolutePath).isDirectory();

      if (isFileDirectory) {
        angularModules.push(...this.getAngularModules(absolutePath));
      } else if (file.includes('.module.')) {
        //  Angular module is found
        const angularModuleTxt = fs.readFileSync(absolutePath, 'utf8');

        angularModules.push({
          className: this.getClassName(angularModuleTxt),
          fileName: file,
          path: absolutePath,
          components: this.findDeclaredComponents(angularModuleTxt)
        });
      }
    });

    return angularModules;
  }

  private findDeclaredComponents(angularModuleTxt: string): AngularComponent[] {
    const angularComponents: AngularComponent[] = [];
    const angularModuleSplit = angularModuleTxt.split(/\r?\n/); //  This regex supports Windows & Unix systems

    let isDeclarations = false;
    angularModuleSplit.forEach(line => {
      if (line.includes('declarations')) {
        //  Declarations start
        isDeclarations = true;
      }

      if (isDeclarations) {
        //  Grab components in array
        const trimmed = line
          .replace('declarations', '')
          .replace(':', '')
          .replace('[', '')
          .replace(']', '')
          .replace(',', '')
          .trim();

        //  Handle edge cases like declarations: [Comp,Comp], declarations: [Comp, /nComp] etc.
        const arrSplit = trimmed.split(/[ ,]+/);

        if (arrSplit.length > 0) {
          arrSplit.forEach(angularComponentTxt => {
            if (angularComponentTxt) {
              angularComponents.push({ className: angularComponentTxt, path: '', fileName: '' });
            }
          })
        }
      }

      if (line.includes(']') && isDeclarations) {
        //  Declarations end
        isDeclarations = false;
      }
    });

    return angularComponents;
  }

  private getClassName(txt: string): string {
    const lines = txt.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++){
      const line = lines[i];

      if (line.includes('export class')) {
        const split = line.split(' ');
        return split[2];
      }
    }
  }
}

