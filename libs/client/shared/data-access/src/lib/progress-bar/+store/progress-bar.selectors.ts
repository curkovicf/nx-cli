import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PROGRESS_FEATURE_KEY, ProgressBarState} from './progress-bar.reducer';

export const getProgressBarState =
  createFeatureSelector<ProgressBarState>(PROGRESS_FEATURE_KEY);

export const getIsProgressServiceActive = createSelector(
  getProgressBarState,
  state => state.numberOfActiveActions > 0,
);
