import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { AppGlobalsIpcEventsListenerService, IpcEventsListenerService } from '@nx-cli/shared/data-access/ipc-events';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { AppGlobalsFacade } from '@nx-cli/client/shell/data-access';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { filter, first, map, mergeMap, pluck, tap } from 'rxjs/operators';
import { AppGlobalsIpcApiService } from '@nx-cli/shared/data-access/ipc-api';

@Component({
  selector: 'dev-workspace-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
  animations: [drawerAnimation]
})
export class ClientLayoutComponent {
  public isDrawerOpen = false;

  constructor(
    public projectsStore: ProjectsStore,
    public workspacesFacade: WorkspacesFacade,
    public appGlobalsFacade: AppGlobalsFacade,
    private localStorageService: UtilLocalStorageService,
    private ipcEventsListenerService: IpcEventsListenerService,
    private appGlobalsIpcEventsListenerService: AppGlobalsIpcEventsListenerService,
    private appGlobalsIpcApiService: AppGlobalsIpcApiService,
    private dialog: MatDialog,
  ) {
    this.ipcEventsListenerService.initChannels();
    this.appGlobalsIpcEventsListenerService.initChannels();
    this.localStorageService.initData();

    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        pluck('path'),
        tap(path => this.appGlobalsIpcApiService.checkIfThereAreIssues(path)),
      ).subscribe();
  }

  public onSelectWorkspace(selectedWorkspace: Workspace): void {
    this.workspacesFacade.selectWorkspace(selectedWorkspace);
    this.projectsStore.patchState({ selectedProject: undefined });
    this.projectsStore.getAllProjects(selectedWorkspace);
    this.localStorageService.save();
  }

  public onAddWorkspace(): void {
    this.toggleDrawer();
  }

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onCreateWorkspace(workspace: Workspace): void {
    this.workspacesFacade.addWorkspace(workspace);
    this.localStorageService.save();
    this.toggleDrawer();
  }

  public onDeleteWorkspace(workspace: Workspace): void {
    this.workspacesFacade.deleteWorkspace(workspace);
    this.projectsStore.resetState();
  }

  public onShowError(): void {
    const data: ConfirmDialogContent = {
      title: 'Nx is not installed on your machine or project does not have node_modules. Attempt to fix ?',
      bodyText: 'You can also do it manually by running: npm install -g @nrwl/cli, and (if) project does not have node_modules run: npm i in the project dir.'
    };

    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(
        filter(isConfirm => isConfirm),
        mergeMap(() => this.workspacesFacade.selectedWorkspace$
          .pipe(
            first(),
            map(selectedWorkspace => ({ workspacePath: selectedWorkspace?.path }))
          )
        )
      )
      .subscribe(({ workspacePath }) => this.appGlobalsIpcApiService.attemptToFixIssues(workspacePath));
  }
}
