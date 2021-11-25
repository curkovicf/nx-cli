import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspacesState } from './workspaces.reducer';
import { WORKSPACES_FEATURE_KEY } from './workspaces.reducer';


export const getWorkspacesState = createFeatureSelector<WorkspacesState>(WORKSPACES_FEATURE_KEY);


export const getWorkspaces = createSelector(getWorkspacesState, (state) => state.workspaces);

export const getSelectedProject = createSelector(getWorkspacesState, (state) => state.selectedWorkspace?.selectedProject);

export const getSelectedWorkspace = createSelector(getWorkspacesState, (state) => state.selectedWorkspace);
