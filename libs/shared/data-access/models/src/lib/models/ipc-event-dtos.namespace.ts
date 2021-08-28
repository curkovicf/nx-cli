import { ProjectType } from '@nx-cli/client/projects/data-access';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEventDtos {
  export interface GenerateDto {
    artifactName: string;
    workspacePath: string;
    projectName: string;
    flags?: string[];
    parentModule?: string;
  }

  export interface MoveProjectDto {
    projectName: string;
    oldPath: string;  //  Needed for Windows
    moveTo: string;
    projectNameInNxJson: string;
    workspacePath: string;
  }

  export interface RenameProjectDto {
    newPath: string;
    oldPath: string;  //  Needed for Windows
    projectNameInNxJson: string;
    workspacePath: string;
    type: ProjectType;
  }

  export interface CreateProjectDto {
    path: string;
    workspacePath: string;
    tags?: string[];
    flags?: string[];
    type: 'app' | 'lib';
  }

  export interface DeleteProjectDto {
    projectNameInNxJson: string;
    workspacePath: string;
    type: ProjectType;
  }

  export interface GenerateLibrary {
    workspacePath: string;
    name: string;
    directory: string;
    importPath: string;
    prefix: string;
    buildable: boolean;
    enableIvy: boolean;
    addModuleSpecFile: boolean;
    publishable: boolean;
    simpleModuleName: boolean;
    tags: string;
  }
}
