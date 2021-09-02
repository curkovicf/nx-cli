import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppGlobalsState } from '@nx-cli/client/shell/data-access';

import * as AppGlobalsSelectors from './app-globals.selectors'
import * as AppGlobalsActions from './app-globals.actions'

@Injectable()
export class AppGlobalsFacade {
  public isNxInstalledOnUserMachine$ = this.store.select(AppGlobalsSelectors.getIsNxInstalledState);

  constructor(private store: Store<AppGlobalsState>) {}

  public setIsNxInstalled(isNxInstalledOnUserMachine: boolean): void {
    this.store.dispatch(AppGlobalsActions.setIsNxInstalled({ isNxInstalledOnUserMachine }));
  }
}
