import {createReducer, on} from '@ngrx/store';

import * as ProjectsActions from './projects.actions';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';

export const PROJECTS_FEATURE_KEY = 'projects';

export interface ProjectsState {
  projects: Project[];
}

export const initialState: ProjectsState = {
  projects: [],
};

export const projectsReducer = createReducer(
  initialState,
  on(ProjectsActions.addProjects, (state, {projects}) => ({...state, projects})),
  on(ProjectsActions.removeTag, (state, {projectName, tagToDelete}) => ({
    projects: state.projects.map(project => {
      if (project.nameInConfig === projectName) {
        return {
          ...project,
          tags: project.tags.filter(tag => tag !== tagToDelete),
        };
      }

      return project;
    }),
  })),
  on(ProjectsActions.addTags, (state, {dto}) => ({
    projects: state.projects.map(project =>
      project.nameInConfig === dto.selectedProjectName
        ? {
            ...project,
            tags: [...project.tags, ...dto.tags],
          }
        : project,
    ),
  })),
);
