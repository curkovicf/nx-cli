import {createAction, props} from '@ngrx/store';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';
import { AddTagResult } from 'nx-cli-osfn/lib/projects/dtos/add-tag-result.dto';

export const addProjects = createAction(
  '[Projects] Add projects',
  props<{projects: Project[]}>(),
);

export const removeTag = createAction(
  '[Projects] Remove tag from project',
  props<{projectName: string; tagToDelete: string}>(),
);

export const addTags = createAction(
  '[Projects] Add tags to project',
  props<{dto: AddTagResult}>(),
);
