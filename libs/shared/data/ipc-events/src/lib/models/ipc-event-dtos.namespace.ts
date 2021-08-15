// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEventDtos {
  export interface GenerateComponentDto {
    componentName: string;
    rootPath: string;
    projectNxName: string;
    flags: string[];
    parentModule?: string;
  }

  export interface GenerateResultDto {
    isSuccess: boolean;
    componentName: string;
    rootPath: string;
  }

  export type ProjectPath = string;
}
