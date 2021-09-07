import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_GLOBALS_STATE, AppGlobalsState } from './app-globals.reducer';

export const getAppGlobals = createFeatureSelector<AppGlobalsState>(APP_GLOBALS_STATE);


export const getHasIssuesState = createSelector(getAppGlobals, (state) => state.hasIssues);
