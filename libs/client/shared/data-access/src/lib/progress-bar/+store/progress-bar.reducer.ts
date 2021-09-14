import { createReducer, on } from '@ngrx/store';

import * as ProgressBarActions from './progress-bar.actions';

export const PROGRESS_FEATURE_KEY = 'progress-bar';

export interface ProgressBarState {
  numberOfActiveActions: number;
}

const initialState: ProgressBarState = {
  numberOfActiveActions: 0
}

export const progressBarReducer = createReducer(
  initialState,
  on(ProgressBarActions.setActiveOperationState, (state, { value }) => ({ numberOfActiveActions: state.numberOfActiveActions + value }))
);
