import { createReducer, on } from '@ngrx/store';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState {
}

export const initialState: ProjectsState = {
};

export const projectsReducer = createReducer(
  initialState,
);
