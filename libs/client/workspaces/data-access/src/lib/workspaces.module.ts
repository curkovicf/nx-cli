import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { WorkspacesFacade } from './+store/workspaces.facade';
import { WORKSPACES_FEATURE_KEY, workspacesReducer } from './+store/workspaces.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature(WORKSPACES_FEATURE_KEY, workspacesReducer)
  ],
  providers: [WorkspacesFacade]
})
export class WorkspacesModule {

}