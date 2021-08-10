import { NxApp, NxLibrary } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEventDtos {
  export interface Package {
    name: string;
    version: string;
  }

  export interface Operation {
    projectId: string;
    projectPath: string;
    tasks: Task[];
  }

  export interface Task {
    packageName: string;
    taskAction: TaskAction;
  }

  export enum TaskAction {
    INSTALL,
    INSTALL_SAVE_DEV,
    REMOVE,
  }

  export type ProjectPath = string;

  export interface Projects {
    apps: NxApp[];
    libs: NxLibrary[];
  }
}
