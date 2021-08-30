import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { WorkspacesState } from './workspaces.store';
import { Workspace } from '../models/workspace.model';

import * as WorkspacesSelectors from './workspaces.selectors';
import * as WorkspacesActions from './workspaces.actions';

@Injectable()
export class WorkspacesFacade {
  public workspaces$ = this.store.select(WorkspacesSelectors.getWorkspaces);
  public selectedWorkspace$ = this.store.select(WorkspacesSelectors.getSelectedWorkspace);

  constructor(private store: Store<WorkspacesState>) {}

  public setWorkspacesState(workspacesState: WorkspacesState): void {
    this.store.dispatch(WorkspacesActions.setWorkspacesState({ workspacesState }));
  }

  public selectWorkspace(selectedWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.selectWorkspace({ selectedWorkspace }));
  }

  public addWorkspace(newWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.addWorkspace({ newWorkspace }));
  }

  public deleteWorkspace(workspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.deleteWorkspace({ workspace }));
  }

  public addLog(workspaceName: string, log: string): void {
    this.store.dispatch(WorkspacesActions.addLog({ workspaceName, log }));
  }
}
