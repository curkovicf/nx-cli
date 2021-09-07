import { createReducer, on } from '@ngrx/store';
import * as AppGlobalsActions from './app-globals.actions';

export const APP_GLOBALS_STATE = 'APP_GLOBALS_STATE';

export interface AppGlobalsState {
  hasIssues: boolean;
}

const initialState: AppGlobalsState = {
  hasIssues: false
}

export const appGlobalsReducer = createReducer(
  initialState,
  on(AppGlobalsActions.setHasIssues, (state, { hasIssues }) => ({ hasIssues })),
);
