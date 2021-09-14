import { NgModule } from '@angular/core';
import { ProgressBarFacade } from './+store/progress-bar.facade';
import { StoreModule } from '@ngrx/store';
import { PROGRESS_FEATURE_KEY, progressBarReducer } from '@nx-cli/client/shared/data-access';

@NgModule({
  imports: [
    StoreModule.forFeature(PROGRESS_FEATURE_KEY, progressBarReducer)
  ],
  providers: [
    ProgressBarFacade
  ]
})
export class ProgressBarModule {}
