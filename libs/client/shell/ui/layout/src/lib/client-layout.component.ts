import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { IpcEventsListenerService } from '@nx-cli/shared/data-access/ipc-events';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

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
    private localStorageService: UtilLocalStorageService,
    private ipcEventsListenerService: IpcEventsListenerService
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
}
