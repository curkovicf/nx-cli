import { EventChannel } from '@nx-cli/shared/data-access/models';

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
}
