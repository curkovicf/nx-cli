import { createReducer, on } from '@ngrx/store';
import * as AppGlobalsActions from './app-globals.actions';

export const APP_GLOBALS_STATE = 'APP_GLOBALS_STATE';

export interface AppGlobalsState {
  isNxInstalledOnUserMachine: boolean;
}

const initialState: AppGlobalsState = {
  isNxInstalledOnUserMachine: false
}

export const appGlobalsReducer = createReducer(
  initialState,
  on(AppGlobalsActions.setIsNxInstalled, (state, { isNxInstalledOnUserMachine }) => ({ isNxInstalledOnUserMachine })),
);
