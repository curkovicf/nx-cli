import { EventChannel } from './event-channel.interface';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkspacesIpcEvents {
  export const validateWorkspacePath: EventChannel = {
    fromAngular: 'VALIDATE_PATH',
    fromElectron: 'VALIDATE_PATH_RESULT'
  };
  export const loggingChannel: EventChannel = {
    fromAngular: 'LOGGING',
    fromElectron: 'LOGGING_RESULT'
  };
  export const tags: EventChannel = {
    fromAngular: 'TAGS',
    fromElectron: 'TAGS_RESULT'
  };
  export const getAvailableGenerators: EventChannel = {
    fromAngular: 'GET_AVAILABLE_GENERATORS',
    fromElectron: 'GET_AVAILABLE_GENERATORS_RESULT'
  };
}
