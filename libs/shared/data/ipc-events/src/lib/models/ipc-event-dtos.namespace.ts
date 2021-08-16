// eslint-disable-next-line @typescript-eslint/no-namespace
import { ProjectType } from '@nx-cli/client/projects/data-access/store';

export namespace IpcEventDtos {
  export interface GenerateDto {
    artifactName: string;
    nxProjectRootPath: string;
    parentProjectNameInNxJson: string;
    flags?: string[];
    parentModule?: string;
  }

  export interface MoveProjectDto {
    projectName: string;
    moveTo: string;
    projectNameInNxJson: string;
    nxProjectRootPath: string;
  }

  export interface RenameProjectDto {
    newName: string;
    libPath: string;
    projectNameInNxJson: string;
    nxProjectRootPath: string;
  }

  export interface CreateProjectDto {
    path: string;
    nxProjectRootPath: string;
    tags?: string[];
    flags?: string[];
  }

  export interface DeleteProjectDto {
    projectNameInNxJson: string;
    nxProjectRootPath: string;
    projectType: ProjectType;
  }

  export interface GenerateResultDto {
    isSuccess: boolean;
    artifactName: string;
    rootPath: string;
  }

  export type ProjectPath = string;
}
