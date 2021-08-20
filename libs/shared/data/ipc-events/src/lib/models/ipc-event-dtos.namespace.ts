import { ProjectType } from '@nx-cli/client/home/projects/data-access';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEventDtos {
  export interface GenerateDto {
    artifactName: string;
    workspacePath: string;
    parentProjectNameInNxJson: string;
    flags?: string[];
    parentModule?: string;
  }

  export interface MoveProjectDto {
    projectName: string;
    moveTo: string;
    projectNameInNxJson: string;
    workspacePath: string;
  }

  export interface RenameProjectDto {
    newName: string;
    libPath: string;
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

  export interface GenerateResultDto {
    isSuccess: boolean;
    artifactName: string;
    rootPath: string;
  }
}
