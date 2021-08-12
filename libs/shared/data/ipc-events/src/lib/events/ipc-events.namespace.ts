import { EventChannel } from '../models/event-channel.interface';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEvents {
  export const isAngularProject: EventChannel = {
    fromAngular: 'CHECK_IS_ANGULAR_PROJECT',
    fromNode: 'CHECK_IS_ANGULAR_PROJECT_RESULT',
  };
  export const cleanup: EventChannel = {
    fromAngular: 'CLEANUP',
    fromNode: 'CLEANUP_RESULT',
  };
  export const installedPackages: EventChannel = {
    fromAngular: 'GET_INSTALLED_PACKAGES',
    fromNode: 'GET_INSTALLED_PACKAGES_RESULT',
  };
  export const installedPackagesForMany: EventChannel = {
    fromAngular: 'GET_INSTALLED_PACKAGES_ALL_PROJECTS',
    fromNode: 'GET_INSTALLED_PACKAGES_ALL_PROJECTS_RESULT',
  };
  export const applyOperation: EventChannel = {
    fromAngular: 'APPLY_OPERATION',
    fromNode: 'APPLY_OPERATION_RESULT',
  };
  export const githubAuth: EventChannel = {
    fromAngular: 'GITHUB_AUTH',
    fromNode: 'GITHUB_AUTH_RESULT',
  };

  export const projects: EventChannel = {
    fromAngular: 'GET_PROJECTS',
    fromNode: 'GET_PROJECTS_RESULT',
  };
}
