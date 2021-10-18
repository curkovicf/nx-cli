
import { createAction, props } from '@ngrx/store';
import { Project, ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';


export const addProjects = createAction('[Projects] Add projects', props<{ projects: Project[] }>());

export const setSelectedProject = createAction('[Projects] Set selected project', props<{ selectedProject: Project }>());

export const removeTag = createAction('[Projects] Remove tag from project', props<{ projectName: string; tagToDelete: string }>());

export const addTags = createAction('[Projects] Add tags to project', props<{ dto: ProjectsIpcDtos.AddTagResult }>());
