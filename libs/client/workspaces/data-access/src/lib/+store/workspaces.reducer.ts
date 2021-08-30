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
  on(WorkspacesActions.addLog, (state, { workspaceName ,log }) => ({
    selectedWorkspace: state.selectedWorkspace.name === workspaceName ?
      { ...state.selectedWorkspace, consoleLogs: [...state.selectedWorkspace.consoleLogs, log] } :
      state.selectedWorkspace,
    workspaces: [
      ...state.workspaces.map(w => w.name === workspaceName ? { ...w, consoleLogs: [...w.consoleLogs, log] } : w)
    ]
  }))
);
