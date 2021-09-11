import { Component } from '@angular/core';
import { projectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { IpcEventsListenerService } from '@nx-cli/client/shared/data-access';

@Component({
  selector: 'nx-cli-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [drawerAnimation],
})
export class LayoutComponent {
  public isDrawerOpen = false;

  constructor(
    public projectsStore: projectsStore,
    public workspacesFacade: WorkspacesFacade,
    private localStorageService: UtilLocalStorageService,
    private ipcEventsListenerService: IpcEventsListenerService,
    private dialog: MatDialog
  ) {
    this.ipcEventsListenerService.initChannels();
    this.localStorageService.initData();
  }

  public onSelectWorkspace(selectedWorkspace: Workspace): void {
    this.workspacesFacade.selectWorkspace(selectedWorkspace);
    // this.projectsStore.patchState({ selectedProject: undefined });
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
      title: '🚨 IMPORTANT 🚨',
      bodyText: `Machine has to have installed nx globally, and every project should have proper node_modules. Install Nx Workspaces: npm install -g nx, and (if) project does not have node_modules run: npm i in the project dir.`,
    };

    this.dialog.open(ConfirmDialogComponent, { data, width: '55rem' }).afterClosed().subscribe();
  }
}
