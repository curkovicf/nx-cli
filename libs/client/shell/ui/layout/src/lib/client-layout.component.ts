import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { IpcEventsListenerService } from '@nx-cli/shared/data-access/ipc-events';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { AppGlobalsFacade } from '@nx-cli/client/shell/data-access';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { filter } from 'rxjs/operators';
import { AppGlobalsIpcApiService } from '../../../../../../shared/data-access/ipc-api/src/lib/app-globals-ipc-api.service';

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
    private appGlobalsIpcApiService: AppGlobalsIpcApiService,
    private dialog: MatDialog,
  ) {
    this.ipcEventsListenerService.initChannels();
    this.localStorageService.initData();
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

  public onInstallNx(): void {
    const data: ConfirmDialogContent = {
      title: 'Nx is not installed on your machine. Would you like to install it ?',
      bodyText: 'You can also do it manually by running: npm install nx -g'
    };

    this.dialog.open(ConfirmDialogComponent, { data })
      .afterClosed()
      .pipe(filter(isConfirm => isConfirm))
      .subscribe(() => this.appGlobalsIpcApiService.installNxOnUserMachine());
  }
}
