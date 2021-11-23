import { createReducer, on } from '@ngrx/store';
import { Workspace } from '@nx-cli/shared/data-access/models';

import * as WorkspacesActions from './workspaces.actions';


export const WORKSPACES_FEATURE_KEY = 'workspaces';

export interface WorkspacesState {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | null;
}

export const initialState: WorkspacesState = {
  workspaces: [],
  selectedWorkspace: null
};

export const workspacesReducer = createReducer(
  initialState,
  on(WorkspacesActions.setWorkspacesState, (state, { workspacesState }) => ({ ...workspacesState })),
  on(WorkspacesActions.switchCurrentWorkspace, (state, { selectedWorkspace }) => ({ ...state, selectedWorkspace })),
  on(WorkspacesActions.addWorkspace, (state, { newWorkspace }) => ({
    ...state,
    workspaces: [...state.workspaces, newWorkspace]
  })),
  on(WorkspacesActions.deleteWorkspace, (state, { workspace }) => ({
    workspaces: state.workspaces.filter(w => w.name !== workspace.name),
    selectedWorkspace: null
  })),
  on(WorkspacesActions.addLogs, (state, { workspacePath, logs }) => ({
    selectedWorkspace: state.selectedWorkspace && state.selectedWorkspace.path === workspacePath ?
      { ...state.selectedWorkspace, consoleLogs: [...state.selectedWorkspace.consoleLogs, ...logs] } :
      state.selectedWorkspace,
    workspaces: [
      ...state.workspaces.map(w => w.path === workspacePath ? { ...w, consoleLogs: [...w.consoleLogs, ...logs] } : w)
    ]
  })),
  on(WorkspacesActions.clearLog, (state, { workspacePath }) => ({
    selectedWorkspace: state.selectedWorkspace.path === workspacePath ?
      { ...state.selectedWorkspace, consoleLogs: [] } :
      state.selectedWorkspace,
    workspaces: [
      ...state.workspaces.map(w => w.path === workspacePath ? { ...w, consoleLogs: [] } : w)
    ]
  })),
  on(WorkspacesActions.addTags, (state, { tags }) => ({
    ...state,
    selectedWorkspace: { ...state.selectedWorkspace, tags }
  })),
  on(WorkspacesActions.addNxGenerators, (state, { nxGenerators: nxGeneratorsDto }) => ({
    workspaces: state.workspaces.map(w => w.path === nxGeneratorsDto.workspacePath ? {
      ...w,
      generators: nxGeneratorsDto.generators
    } : w),
    selectedWorkspace: state.selectedWorkspace.path === nxGeneratorsDto.workspacePath ? {
      ...state.selectedWorkspace,
      generators: nxGeneratorsDto.generators
    } : state.selectedWorkspace
  })),
  on(WorkspacesActions.setSelectedProject, (state, { workspacePath, selectedProject }) => ({
    ...state,
    workspaces: state.workspaces.map(w => w.path === workspacePath ? ({ ...w, selectedProject }) : w),
    selectedWorkspace: {
      ...state.selectedWorkspace,
      selectedProject
    }
  }))
);
