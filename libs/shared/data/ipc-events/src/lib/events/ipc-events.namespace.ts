import { EventChannel } from '../models/event-channel.interface';


// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace IpcEvents {
  export const validateWorkspacePath: EventChannel = { fromAngular: 'VALIDATE_PATH', fromElectron: 'VALIDATE_PATH_RESULT' };
  export const getAllProjects: EventChannel = { fromAngular: 'GET_ALL_PROJECTS', fromElectron: 'GET_ALL_PROJECTS_RESULT' };
  export const getAllWorkspaces: EventChannel = { fromAngular: 'GET_ALL_WORKSPACES', fromElectron: 'GET_ALL_WORKSPACES_RESULT' };
  export const createComponent: EventChannel = { fromAngular: 'CREATE_COMPONENT', fromElectron: 'CREATE_COMPONENT_RESULT' };
  export const moveProject: EventChannel = { fromAngular: 'MOVE_PROJECT', fromElectron: 'MOVE_PROJECT_RESULT' };
  export const renameProject: EventChannel = { fromAngular: 'RENAME_PROJECT', fromElectron: 'RENAME_PROJECT_RESULT' };
  export const deleteProject: EventChannel = { fromAngular: 'DELETE_PROJECT', fromElectron: 'DELETE_PROJECT_RESULT' };
  export const createService: EventChannel = { fromAngular: 'CREATE_SERVICE', fromElectron: 'CREATE_SERVICE_RESULT' };
  export const createApp: EventChannel = { fromAngular: 'CREATE_APP', fromElectron: 'CREATE_APP_RESULT' };
  export const createLib: EventChannel = { fromAngular: 'CREATE_LIB', fromElectron: 'CREATE_LIB_RESULT' };
  export const defaultChannel: EventChannel = { fromAngular: 'GENERIC', fromElectron: 'GENERIC_RESULT' };
}
