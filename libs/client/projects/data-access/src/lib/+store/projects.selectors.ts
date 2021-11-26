import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PROJECTS_FEATURE_KEY, ProjectsState} from './projects.reducer';

export const getProjectsState =
  createFeatureSelector<ProjectsState>(PROJECTS_FEATURE_KEY);

export const getProjects = createSelector(getProjectsState, state => state.projects);
