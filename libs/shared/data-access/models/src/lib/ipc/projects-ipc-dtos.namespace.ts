import { ProjectType } from '../api/project-type.enum';
import { NxGenerator } from '../api/nx-generator.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace ProjectsIpcDtos {
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

  export interface RemoveTag {
    workspacePath: string;
    tagToDelete: string;
    selectedProject: string;
  }

  export interface Tag {
    tags: string;
    workspacePath: string;
    selectedProjectName: string;
  }

  export interface AddTagResult {
    tags: string[];
    workspacePath: string;
    selectedProjectName: string;
  }

  export interface Generators {
    workspacePath: string;
    generators: NxGenerator[];
  }
}
