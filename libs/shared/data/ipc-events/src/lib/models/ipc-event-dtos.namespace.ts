// eslint-disable-next-line @typescript-eslint/no-namespace
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

  export interface GenerateResultDto {
    isSuccess: boolean;
    artifactName: string;
    rootPath: string;
  }

  export type ProjectPath = string;
}
