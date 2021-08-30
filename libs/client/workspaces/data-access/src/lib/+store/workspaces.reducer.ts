import { createReducer, on } from '@ngrx/store';
import * as WorkspacesActions from './workspaces.actions';
import { Workspace } from '../models/workspace.model';

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
  on(WorkspacesActions.selectWorkspace, (state, { selectedWorkspace }) => ({ ...state, selectedWorkspace })),
  on(WorkspacesActions.addWorkspace, (state, { newWorkspace }) => ({
    ...state,
    workspaces: [...state.workspaces, newWorkspace]
  })),
  on(WorkspacesActions.deleteWorkspace, (state, { workspace }) => ({
    workspaces: state.workspaces.filter(w => w.name !== workspace.name),
    selectedWorkspace: null
  })),
  on(WorkspacesActions.addLogs, (state, { workspacePath , logs }) => ({
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
  }))
);
