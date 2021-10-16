import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WorkspacesState } from './workspaces.store';
import { Workspace } from '@nx-cli/shared/data-access/models';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import * as WorkspacesSelectors from './workspaces.selectors';
import * as WorkspacesActions from './workspaces.actions';


@Injectable()
export class WorkspacesFacade {
  workspaces$ = this.store.pipe(select(WorkspacesSelectors.getWorkspaces));
  selectedWorkspace$ = this.store.pipe(select(WorkspacesSelectors.getSelectedWorkspace));

  constructor(private store: Store<WorkspacesState>) {}

  setWorkspacesState(workspacesState: WorkspacesState): void {
    this.store.dispatch(WorkspacesActions.setWorkspacesState({ workspacesState }));
  }

  selectWorkspace(selectedWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.switchCurrentWorkspace({ selectedWorkspace }));
  }

  addWorkspace(newWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.addWorkspace({ newWorkspace }));
  }

  deleteWorkspace(workspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.deleteWorkspace({ workspace }));
  }

  addLog(workspacePath: string, logs: string[]): void {
    this.store.dispatch(WorkspacesActions.addLogs({ workspacePath, logs }));
  }

  clearConsole(workspacePath: string): void {
    this.store.dispatch(WorkspacesActions.clearLog({ workspacePath }));
  }

  getSelectedWorkspacePath(): Observable<string> {
    return this.selectedWorkspace$.pipe(first(), map((w) => w?.path));
  }

  addTags(tags: string[]): void {
    this.store.dispatch(WorkspacesActions.addTags({ tags }));
  }
}
