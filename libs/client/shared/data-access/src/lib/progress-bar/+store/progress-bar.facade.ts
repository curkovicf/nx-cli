import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProgressBarState } from './progress-bar.reducer';

import * as ProgressServiceSelectors from './progress-bar.selectors';
import * as ProgressServiceActions from './progress-bar.actions';

@Injectable()
export class ProgressBarFacade {
  isProgressServiceActive$ = this.store.pipe(select(ProgressServiceSelectors.getIsProgressServiceActive));

  constructor(private store: Store<ProgressBarState>) {}

  public addNewActiveAction(): void {
    this.store.dispatch(ProgressServiceActions.setActiveOperationState({ value: 1 }));
  }

  public removeActiveAction(): void {
    this.store.dispatch(ProgressServiceActions.setActiveOperationState({ value: -1 }));
  }
}
