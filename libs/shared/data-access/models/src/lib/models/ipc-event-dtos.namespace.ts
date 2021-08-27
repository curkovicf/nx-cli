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
    name: string;
    directory: string;
    importPath: string;
    parentModule: string;
    prefix: string;
    lazy: boolean;
    buildable: boolean;
    enableIvy: boolean;
    publishable: boolean;
    routing: boolean;
    simpleModuleName: boolean;
    libTags: string[];
  }
}
