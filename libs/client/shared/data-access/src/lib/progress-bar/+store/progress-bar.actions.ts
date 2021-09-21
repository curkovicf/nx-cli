import { createAction } from '@ngrx/store';

export const addActiveOperation = createAction('[Progress Bar] set action as active');

export const removeActiveOperation = createAction('[Progress Bar] remove action as active');
