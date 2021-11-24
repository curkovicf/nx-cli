import * as path from 'path';
import * as fsExtra from 'fs-extra';
import * as fs from 'fs';


import { NodeUtils, OsUtils } from '@nx-cli/app/shared/util';
import {
  AngularComponent,
  AngularModule,
  FileType,
  fileTypes,
  FolderType,
  folderTypes, getNxGeneratorFieldValue,
  Project,
  ProjectFolder,
  ProjectsIpcDtos,
  ProjectType
} from '@nx-cli/shared/data-access/models';
import { StringUtils } from '@nx-cli/shared/util';

interface ObjWithRootField {
  root: string;
}

interface ObjWithTagsField {
  tags: string[];
}

//  FIXME: Impl everything as async

export class ProjectsRepository {
  /**
   *
   * @param pwd
   * @param rootPath
   */
  getAllProjects(pwd: string, rootPath: string): Project[] {
    let projects: Project[] = [];
    let matchingNameCounter = 0;
    const files = fs.readdirSync(pwd);

    files.forEach((file: string) => {
      const absolutePath = path.join(pwd, file);
      const isFileDirectory = fs.statSync(absolutePath).isDirectory();

      if (isFileDirectory && !file.includes('node_modules') && !file.includes('dist')) {
        projects = [...projects, ...this.getAllProjects(absolutePath, rootPath)];
      } else if (this.isProject(file, files)) {
        matchingNameCounter++;
      }

      if (matchingNameCounter > 1) {
        projects.push({
          name: this.getProjectName(pwd),
          path: pwd,
          relativePath: this.trimToRelativePath(pwd, rootPath),
          type: this.getProjectType(pwd, rootPath),
          nameInNxJson: '',
          angularModules: this.getAngularModules(pwd),
          folderTree: this.getProjectFolderTree(pwd),
          tags: [],
        });

        matchingNameCounter = 0;
      }
    });

    return projects;
  }

  /**
   *
   * @param workspacePath
   */
  async cleanEmptyDirWinFunction(workspacePath: string): Promise<void> {
    const fileStats = await fsExtra.lstat(workspacePath);

    if (!fileStats.isDirectory()) {
      return;
    }

    let fileNames = await fsExtra.readdir(workspacePath);

    if (fileNames.length > 0) {
      const recursiveRemovalPromises = fileNames.map(
        (fileName) => this.cleanEmptyDirWinFunction(path.join(workspacePath, fileName))
      );
      await Promise.all(recursiveRemovalPromises);

      // re-evaluate fileNames; after deleting subdirectory
      // we may have parent directory empty now
      fileNames = await fsExtra.readdir(workspacePath);
    }

    if (fileNames.length === 0) {
      await fsExtra.rmdir(workspacePath);
    }
  }

  /**
   *
   * @param projectPath
   */
  getAngularModules(projectPath: string): AngularModule[] {
    const angularModules: AngularModule[] = [];
    const files = fs.readdirSync(projectPath); //  Open lib

    //  Recursively look for all angular modules
    files.forEach((file: string) => {
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
          components: this.findDeclaredComponents(angularModuleTxt),
        });
      }
    });

    return angularModules;
  }

  /**
   *
   * @param txt
   */
  getClassName(txt: string): string {
    const lines = txt.split(/\r?\n/);

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      if (line.includes('export class')) {
        const split = line.split(' ');
        return split[2];
      }
    }

    return 'ERROR';
  }

  /**
   *
   * @param angularModuleTxt
   */
  findDeclaredComponents(angularModuleTxt: string): AngularComponent[] {
    const angularComponents: AngularComponent[] = [];
    const angularModuleSplit = angularModuleTxt.split(/\r?\n/); //  This regex supports Windows & Unix systems

    let isDeclarations = false;
    angularModuleSplit.forEach((line) => {
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
          arrSplit.forEach((angularComponentTxt) => {
            if (angularComponentTxt) {
              angularComponents.push({ className: angularComponentTxt, path: '', fileName: '' });
            }
          });
        }
      }

      if (line.includes(']') && isDeclarations) {
        //  Declarations end
        isDeclarations = false;
      }
    });

    return angularComponents;
  }

  /**
   *
   * @param pwd
   */
  getProjectFolderTree(pwd: string): ProjectFolder {
    const name = pwd.split(OsUtils.getPlatformPathSeparator()).pop();
    let folderType;

    for (const type of folderTypes) {
      if (type.includes(name)) {
        folderType = type;
        break;
      }
    }

    const projectTree: ProjectFolder = {
      name,
      folderContent: [],
      isDir: true,
      dirType: folderType ?? FolderType.unknown
    };

    const files = fs.readdirSync(pwd);

    files.forEach((file: string) => {
      //  Check if its folder, and if it is call recursively
      const absolutePath = path.join(pwd, file);
      const isDir = fs.statSync(absolutePath).isDirectory();

      if (isDir) {
        projectTree.folderContent.push(this.getProjectFolderTree(absolutePath));
      } else {
        let fileType;

        for (const type of fileTypes) {
          if (file.includes(type)) {
            fileType = type;
            break;
          }
        }

        //  If its file push to content
        projectTree.folderContent.push({
          name: file,
          isDir: false,
          fileType: fileType ?? FileType.unknown
        });
      }
    });

    return projectTree;
  }

  /**
   *
   * @param pwd
   */
  getProjectName(pwd: string): string {
    const splitPath = pwd.split(OsUtils.getPlatformPathSeparator());
    return splitPath[splitPath.length - 1];
  }

  /**
   *
   * @param workspacePath
   * @param file
   * @param projects
   */
  async getProjectsNames(workspacePath: string, file: string, projects: Project[]): Promise<void> {
    const filePath = `${workspacePath}${OsUtils.getPlatformPathSeparator()}${file}`;
    const fileAsJson = await fsExtra.readJSON(filePath);

    Object.entries(fileAsJson.projects).forEach(([key, value]) => {
      let currentProjectPath: string;

      if (file === 'workspace.json') {
        currentProjectPath = OsUtils.parsePath(value as string);
      } else {
        currentProjectPath = OsUtils.parsePath((value as ObjWithRootField).root ?? '');
      }

      projects.forEach((project) => {
        const trimmedPath = OsUtils.parsePath(this.trimToRelativePath(project.path, workspacePath).substring(1));

        if (currentProjectPath === trimmedPath) {
          project.nameInNxJson = key;
        }
      });

    });
  }

  /**
   *
   * @param workspacePath
   * @param projects
   */
  async getTagsOfAllProjectsWithinNxJsonFile(workspacePath: string, projects: Project[]): Promise<void> {
    const pathToNxJson = `${workspacePath}${OsUtils.getPlatformPathSeparator()}nx.json`;
    const nxJson = await fsExtra.readJSON(pathToNxJson);

    Object.entries(nxJson.projects).forEach(([key, value]) => {
      projects.forEach((project) => {
        if (project.nameInNxJson === key) {
          project.tags.push(...(value as ObjWithTagsField).tags);
        }
      });
    });
  }

  /**
   *
   * @param pwd
   * @param rootPath
   */
  getProjectType(pwd: string, rootPath: string): ProjectType | undefined {
    const libraryTypes = Object.values(ProjectType);
    const keywords = this.trimToRelativePath(pwd, rootPath)
      .split(OsUtils.getPlatformPathSeparator())
      .filter((item) => item !== '' && item !== '/')
      .reverse();

    for (let index = 0; index < libraryTypes.length; index++) {
      if (keywords[0].includes(libraryTypes[index]) || keywords[1].includes(libraryTypes[index])) {
        return libraryTypes[index];
      }
    }

    return undefined;
  }

  /**
   *
   * @param dto
   */
  async removeTag(dto: ProjectsIpcDtos.RemoveTag): Promise<boolean> {
    let isSuccess = false;
    const { tagToDelete, selectedProject, workspacePath } = dto;

    const pathToNxJson = `${workspacePath}${OsUtils.getPlatformPathSeparator()}nx.json`;
    const nxJson = await fsExtra.readJSON(pathToNxJson);

    Object.entries(nxJson.projects).forEach(([key, value]) => {
      if (key === selectedProject) {
        const projectObj = (value as { tags: string[] });
        const tagIndex = projectObj.tags.indexOf(tagToDelete);

        projectObj.tags.splice(tagIndex, 1);

        isSuccess = true;
      }
    });

    await fsExtra.writeJSON(pathToNxJson, nxJson).catch(() => isSuccess = false);

    return isSuccess;
  }

  /**
   *
   * @param dto
   */
  async addTag(dto: ProjectsIpcDtos.Tag): Promise<string[]> {
    const { workspacePath, tags, selectedProjectName } = dto;

    const pathToNxJson = `${workspacePath}${OsUtils.getPlatformPathSeparator()}nx.json`;
    const nxJson = await fsExtra.readJSON(pathToNxJson);

    const newTags = [
      ...tags.split(',')
        .filter(el => Boolean(el))
        .map(el => el.trim())
    ];

    Object.entries(nxJson.projects).forEach(([key, value]) => {
      if (key === selectedProjectName) {
        const projectObj = (value as { tags: string[] });
        projectObj.tags.push(...newTags);
      }
    });

    await fsExtra.writeJSON(pathToNxJson, nxJson);

    return newTags;
  }

  /**
   *
   * @param file
   * @param files
   */
  isProject(file: string, files: string[]): boolean {
    return (
      file.toString() === '.eslintrc.json' ||
      file.toString() === 'tsconfig.json' ||
      (file.toString() === 'tsconfig.spec.json' && files.includes('src'))
    );
  }

  /**
   *
   * @param pwd
   * @param rootPath
   */
  trimToRelativePath(pwd: string, rootPath: string): string {
    return pwd.replace(rootPath, '');
  }

  /**
   *
   * @param dto
   */
  async generateNxArtifact(dto: ProjectsIpcDtos.GenerateArtifact): Promise<NodeUtils.ExecuteCommandResponse> {
    const { nxGenerator, workspacePath } = dto;

    const name = getNxGeneratorFieldValue(nxGenerator, 'name');
    const directory = getNxGeneratorFieldValue(nxGenerator, 'directory');

    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
    const cmd = OsUtils.parsePath(`${nxGenerator.cmd} ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(name)}`);
    const args: string[] = [];

    const { textInputs, checkboxes, dropDowns } = nxGenerator.form;

    textInputs.forEach(textInput =>
      textInput.input &&
      textInput.title !== 'directory' &&
      textInput.title !== 'name'
        ? args.push(`--${textInput.title} ${textInput.input}`) : null);

    checkboxes.forEach(checkBoxInput => checkBoxInput.isChecked ? args.push(`--${checkBoxInput.title} ${checkBoxInput.isChecked}`) : null);

    dropDowns.forEach(dropDownInput => dropDownInput.selectedItem ? args.push(`--${dropDownInput.title} ${dropDownInput.selectedItem}`) : null);


    const result = await NodeUtils.executeCommand(cmd, args, workspacePath, 'CREATE');

    return {
      isSuccess: true,
      log: result?.log
    };
  }
}
