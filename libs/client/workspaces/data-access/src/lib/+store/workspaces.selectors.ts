import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WorkspacesState } from './workspaces.store';
import { WORKSPACES_FEATURE_KEY } from './workspaces.reducer';

export const getWorkspacesState = createFeatureSelector<WorkspacesState>(WORKSPACES_FEATURE_KEY);


export const getWorkspaces = createSelector(getWorkspacesState, (state) => state.workspaces);

export const getSelectedWorkspace = createSelector(getWorkspacesState, (state) => state.selectedWorkspace);
