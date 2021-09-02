import { EventChannel } from '../models/event-channel.interface';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEvents {
  export const validateWorkspacePath: EventChannel = {
    fromAngular: 'VALIDATE_PATH',
    fromElectron: 'VALIDATE_PATH_RESULT'
  };
  export const getAllProjects: EventChannel = {
    fromAngular: 'GET_ALL_PROJECTS',
    fromElectron: 'GET_ALL_PROJECTS_RESULT'
  };
  export const getAllWorkspaces: EventChannel = {
    fromAngular: 'GET_ALL_WORKSPACES',
    fromElectron: 'GET_ALL_WORKSPACES_RESULT'
  };
  export const createComponent: EventChannel = {
    fromAngular: 'CREATE_COMPONENT',
    fromElectron: 'CREATE_COMPONENT_RESULT'
  };
  export const editProject: EventChannel = { fromAngular: 'EDIT_PROJECT', fromElectron: 'EDIT_PROJECT_RESULT' };
  export const deleteProject: EventChannel = { fromAngular: 'DELETE_PROJECT', fromElectron: 'DELETE_PROJECT_RESULT' };
  export const createService: EventChannel = { fromAngular: 'CREATE_SERVICE', fromElectron: 'CREATE_SERVICE_RESULT' };
  export const createApp: EventChannel = { fromAngular: 'CREATE_APP', fromElectron: 'CREATE_APP_RESULT' };
  export const generateLibrary: EventChannel = { fromAngular: 'GENERATE_LIB', fromElectron: 'GENERATE_LIB_RESULT' };
  export const generateApplication: EventChannel = {
    fromAngular: 'GENERATE_APPLICATION',
    fromElectron: 'GENERATE_APPLICATION_RESULT'
  };
  export const defaultChannel: EventChannel = { fromAngular: 'GENERIC', fromElectron: 'GENERIC_RESULT' };
  export const loggingChannel: EventChannel = { fromAngular: 'LOGGING', fromElectron: 'LOGGING_RESULT' };
  export const installNxOnUserMachineChannel: EventChannel = {
    fromAngular: 'INSTALL_NX_ON_USER_MACHINE',
    fromElectron: 'INSTALL_NX_ON_USER_MACHINE_RESULT'
  };
}
