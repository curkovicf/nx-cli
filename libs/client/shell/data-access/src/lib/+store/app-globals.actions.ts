import { createAction, props } from '@ngrx/store';

export const setHasIssues = createAction('[App Globals] App has issues', props<{ hasIssues: boolean }>());
