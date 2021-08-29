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

  export interface GenerateAngularLibrary {
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

  export interface GenerateAngularApplication {
    workspacePath: string;
    name: string;
    directory: string;
    backendProject: string;
    prefix: string;
    tags: string;
    host: string;
    routing: boolean;
    port: number;
  }

  export interface GenerateAngularComponent {
    workspacePath: string;
    name: string;
    directory: string;
    project: string;
    export: boolean;
    flat: boolean;
    skipTests: boolean;
  }

  export interface GenerateAngularService {
    workspacePath: string;
    name: string;
    directory: string;
    project: string;
    flat: boolean;
    skipTests: boolean;
  }

  export interface EditProject {
    workspacePath: string;
    project: string;
    newName: string;
    oldName: string;
    newDirectory: string;
    oldDirectory: string;
  }
}
