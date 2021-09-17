
import { createAction, props } from '@ngrx/store';
import { Project } from '../models/project.model';


export const addProjects = createAction('[Projects] Add projects', props<{ projects: Project[] }>());

export const setSelectedProject = createAction('[Projects] Set selected project', props<{ selectedProject: Project }>());
