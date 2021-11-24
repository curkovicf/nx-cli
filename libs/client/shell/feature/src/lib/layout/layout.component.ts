import { Component } from '@angular/core';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import {
  WorkspacesFacade,
  WorkspacesIpcApiService,
  WorkspacesIpcEventsService
} from '@nx-cli/client/workspaces/data-access';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { Workspace } from '@nx-cli/shared/data-access/models';
import { filter, first, tap } from 'rxjs/operators';

@Component({
  selector: 'nx-cli-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [drawerAnimation],
})
export class LayoutComponent {
  public isDrawerOpen = false;

  constructor(
    public workspacesFacade: WorkspacesFacade,
    public progressBarFacade: ProgressBarFacade,
    private localStorageService: UtilLocalStorageService,
    private workspacesIpcEventsService: WorkspacesIpcEventsService,
    private workspacesIpcApiService: WorkspacesIpcApiService,
    private dialog: MatDialog
  ) {
    this.workspacesIpcEventsService.initChannels();
    this.localStorageService.initData();

    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        filter(selectedWorkspace => !!selectedWorkspace),
        tap(({ path }) => this.workspacesIpcApiService.getAvailableNxGenerators(path))
      )
      .subscribe();
  }

  public onSelectWorkspace(selectedWorkspace: Workspace): void {
    this.workspacesFacade.selectWorkspace(selectedWorkspace);
    this.localStorageService.save();
  }

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onCreateWorkspace(workspace: Workspace): void {
    this.workspacesFacade.addWorkspace(workspace);
    this.localStorageService.save();
    this.toggleDrawer();
  }

  public onShowError(): void {
    const data: ConfirmDialogContent = {
      title: '🚨 IMPORTANT: Make sure you have all dependencies installed 🚨',
      bodyText: `NOTE: If you use NPM, make sure you have node_modules folder. Install Nx Workspaces: npm install -g @nrwl/cli, npm i -g @nrwl/workspace.`,
    };

    this.dialog.open(ConfirmDialogComponent, { data, width: '55rem' }).afterClosed().subscribe();
  }

  public deleteWorkspace($event: Workspace) {
    this.workspacesFacade.deleteWorkspace($event);
    this.localStorageService.save();
  }
}
