import {createReducer, on} from '@ngrx/store';

import * as ProgressBarActions from './progress-bar.actions';

export const PROGRESS_FEATURE_KEY = 'progress-bar';

export interface ProgressBarState {
  numberOfActiveActions: number;
}

const initialState: ProgressBarState = {
  numberOfActiveActions: 0,
};

export const progressBarReducer = createReducer(
  initialState,
  on(ProgressBarActions.addActiveOperation, state => ({
    numberOfActiveActions: state.numberOfActiveActions + 1,
  })),
  on(ProgressBarActions.removeActiveOperation, state => ({
    numberOfActiveActions: state.numberOfActiveActions - 1,
  })),
);
