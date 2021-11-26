import {ProjectType} from '../api/project-type.enum';
import {NxGenerator} from '../api/nx-generator.model';

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

  export interface GenerateArtifact {
    nxGenerator: NxGenerator;
    workspacePath: string;
    selectedProjectName: string;
  }
}
