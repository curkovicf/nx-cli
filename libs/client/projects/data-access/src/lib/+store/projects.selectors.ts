import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PROJECTS_FEATURE_KEY, ProjectsState } from './projects.reducer';

export const getWorkspacesState = createFeatureSelector<ProjectsState>(PROJECTS_FEATURE_KEY);


// export const getWorkspaces = createSelector(getWorkspacesState, (state) => state.workspaces);

