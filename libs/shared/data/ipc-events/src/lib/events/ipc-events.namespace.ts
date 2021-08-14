import { EventChannel } from '../models/event-channel.interface';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEvents {
  export const nxProject: EventChannel = {
    fromAngular: 'CHECK_IS_NX_PROJECT',
    fromNode: 'CHECK_IS_NX_PROJECT_RESULT',
  };
  export const applyOperation: EventChannel = {
    fromAngular: 'APPLY_OPERATION',
    fromNode: 'APPLY_OPERATION_RESULT',
  };
  export const projects: EventChannel = {
    fromAngular: 'GET_PROJECTS',
    fromNode: 'GET_PROJECTS_RESULT',
  };
}
