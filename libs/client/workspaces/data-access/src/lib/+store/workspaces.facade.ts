import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { WorkspacesState } from './workspaces.store';
import { Workspace, WorkspacesIpcDtos } from '@nx-cli/shared/data-access/models';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import * as WorkspacesSelectors from './workspaces.selectors';
import * as WorkspacesActions from './workspaces.actions';


@Injectable()
export class WorkspacesFacade {
  workspaces$ = this.store.pipe(select(WorkspacesSelectors.getWorkspaces));
  selectedWorkspace$ = this.store.pipe(select(WorkspacesSelectors.getSelectedWorkspace));

  constructor(private store: Store<WorkspacesState>) {}

  public setWorkspacesState(workspacesState: WorkspacesState): void {
    this.store.dispatch(WorkspacesActions.setWorkspacesState({ workspacesState }));
  }

  public selectWorkspace(selectedWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.switchCurrentWorkspace({ selectedWorkspace }));
  }

  public addWorkspace(newWorkspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.addWorkspace({ newWorkspace }));
  }

  public deleteWorkspace(workspace: Workspace): void {
    this.store.dispatch(WorkspacesActions.deleteWorkspace({ workspace }));
  }

  public addLog(workspacePath: string, logs: string[]): void {
    this.store.dispatch(WorkspacesActions.addLogs({ workspacePath, logs }));
  }

  public clearConsole(workspacePath: string): void {
    this.store.dispatch(WorkspacesActions.clearLog({ workspacePath }));
  }

  public getSelectedWorkspacePath(): Observable<string> {
    return this.selectedWorkspace$.pipe(first(), map((w) => w?.path));
  }

  public addTags(tags: string[]): void {
    this.store.dispatch(WorkspacesActions.addTags({ tags }));
  }

  public addNxGenerators(nxGenerators: WorkspacesIpcDtos.Generators): void {
    this.store.dispatch(WorkspacesActions.addNxGenerators({ nxGenerators }));
  }
}
