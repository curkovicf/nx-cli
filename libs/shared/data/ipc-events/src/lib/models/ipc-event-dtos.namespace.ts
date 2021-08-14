// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEventDtos {
  export interface GenerateComponentDto {
    componentName: string;
    projectPath: string;
    parentModule?: string;
  }

  export type ProjectPath = string;
}
