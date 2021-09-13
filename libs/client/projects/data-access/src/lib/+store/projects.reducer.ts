import { createReducer, on } from '@ngrx/store';
import { Project } from '@nx-cli/client/projects/data-access';

import * as ProjectsActions from './projects.actions';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState {
  projects: Project[];
  selectedProject: Project;
}

export const initialState: ProjectsState = {
  projects: [],
  selectedProject: null
};

export const projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.addProjects, (state, { projects }) => ({ ...state, projects })),
  on(ProjectsActions.setSelectedProject, (state, { selectedProject }) => ({ ...state, selectedProject }))
);

