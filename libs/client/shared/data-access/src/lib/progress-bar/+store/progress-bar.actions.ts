import { createAction, props } from '@ngrx/store';

export const setActiveOperationState = createAction('[Progress Bar] set/remove action as active', props<{ value: number }>());
