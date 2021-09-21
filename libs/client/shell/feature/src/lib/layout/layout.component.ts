import { Component } from '@angular/core';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { WorkspacesFacade, WorkspacesIpcEventsService } from '@nx-cli/client/workspaces/data-access';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { Workspace } from '@nx-cli/shared/data-access/models';

@Component({
  selector: 'nx-cli-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [drawerAnimation],
})
export class LayoutComponent {
  isDrawerOpen = false;

  constructor(
    public workspacesFacade: WorkspacesFacade,
    public progressBarFacade: ProgressBarFacade,
    private localStorageService: UtilLocalStorageService,
    private workspacesIpcEventsService: WorkspacesIpcEventsService,
    private dialog: MatDialog
  ) {
    this.workspacesIpcEventsService.initChannels();
    this.localStorageService.initData();
  }

  onSelectWorkspace(selectedWorkspace: Workspace): void {
    this.workspacesFacade.selectWorkspace(selectedWorkspace);
    this.localStorageService.save();
  }

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  onCreateWorkspace(workspace: Workspace): void {
    this.workspacesFacade.addWorkspace(workspace);
    this.localStorageService.save();
    this.toggleDrawer();
  }

  onShowError(): void {
    const data: ConfirmDialogContent = {
      title: '🚨 IMPORTANT 🚨',
      bodyText: `Machine has to have installed nx globally, and every project should have proper node_modules. Install Nx Workspaces: npm install -g nx, and (if) project does not have node_modules run: npm i in the project dir.`,
    };

    this.dialog.open(ConfirmDialogComponent, { data, width: '55rem' }).afterClosed().subscribe();
  }

  deleteWorkspace($event: Workspace) {
    this.workspacesFacade.deleteWorkspace($event);
    this.localStorageService.save();
  }
}
