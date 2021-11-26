import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';

import {WorkspacesFacade} from './+store/workspaces.facade';
import {WORKSPACES_FEATURE_KEY, workspacesReducer} from './+store/workspaces.reducer';
import {WorkspacesIpcEventsService} from './api/workspaces-ipc-events.service';
import {WorkspacesEffects} from './+store/workspaces.effects';

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSPACES_FEATURE_KEY, workspacesReducer),
    EffectsModule.forFeature([WorkspacesEffects]),
  ],
  providers: [WorkspacesIpcEventsService, WorkspacesFacade],
})
export class WorkspacesModule {}
