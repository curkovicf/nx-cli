import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

import { WorkspacesIpcApiService } from '../api/workspaces-ipc-api.service';
import { WorkspacesFacade } from './workspaces.facade';
import { switchCurrentWorkspace } from './workspaces.actions';

@Injectable()
export class WorkspacesEffects {
  constructor(
    private actions$: Actions,
    private workspacesIpcApiService: WorkspacesIpcApiService,
    private workspacesFacade: WorkspacesFacade,
  ) {}

  fetchAllTags$ = createEffect(() => this.actions$.pipe(
    ofType(switchCurrentWorkspace),
    tap(({ selectedWorkspace }) => {
      this.workspacesIpcApiService.getTags(selectedWorkspace.path);
    })
  ), { dispatch: false });
}
