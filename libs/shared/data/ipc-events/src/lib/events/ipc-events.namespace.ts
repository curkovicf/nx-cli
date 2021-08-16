import { EventChannel } from '../models/event-channel.interface';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEvents {
  export const nxProject: EventChannel = {
    fromAngular: 'CHECK_IS_NX_PROJECT',
    fromNode: 'CHECK_IS_NX_PROJECT_RESULT',
  };
  export const generateComponent: EventChannel = {
    fromAngular: 'GENERATE_COMPONENT',
    fromNode: 'GENERATE_COMPONENT_RESULT',
  };
  export const moveProject: EventChannel = {
    fromAngular: 'MOVE_PROJECT',
    fromNode: 'MOVE_PROJECT_RESULT',
  };
  export const renameProject: EventChannel = {
    fromAngular: 'RENAME_PROJECT',
    fromNode: 'RENAME_PROJECT_RESULT',
  };
  export const deleteProject: EventChannel = {
    fromAngular: 'DELETE_PROJECT',
    fromNode: 'DELETE_PROJECT_RESULT',
  };
  export const generateService: EventChannel = {
    fromAngular: 'GENERATE_SERVICE',
    fromNode: 'GENERATE_SERVICE_RESULT',
  };
  export const projects: EventChannel = {
    fromAngular: 'GET_PROJECTS',
    fromNode: 'GET_PROJECTS_RESULT',
  };
}
