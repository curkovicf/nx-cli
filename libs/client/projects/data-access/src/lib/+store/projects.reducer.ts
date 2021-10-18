import { createReducer, on } from '@ngrx/store';
import { Project } from '@nx-cli/shared/data-access/models';

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
  on(ProjectsActions.setSelectedProject, (state, { selectedProject }) => ({ ...state, selectedProject })),
  on(ProjectsActions.removeTag, (state, { projectName, tagToDelete }) => ({
    projects: state.projects.map(project => {
      if (project.nameInNxJson === projectName) {
        return {
          ...project,
          tags: project.tags.filter(tag => tag !== tagToDelete)
        };
      }

      return project;
    }),
    selectedProject: {
      ...state.selectedProject,
      tags: projectName === state.selectedProject.nameInNxJson ? state.selectedProject.tags.filter(tag => tag !== tagToDelete) : state.selectedProject.tags
    }
  })),
  on(ProjectsActions.addTags, (state, { dto }) => ({
    projects: state.projects.map(project => project.nameInNxJson === dto.selectedProjectName ? ({
      ...project,
      tags: [...project.tags, ...dto.tags]
    }) : project),
    selectedProject: {
      ...state.selectedProject,
      tags: state.selectedProject.nameInNxJson === dto.selectedProjectName ? [...state.selectedProject.tags, ...dto.tags] : state.selectedProject.tags
    }
  }))
);

