import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';
import { IpcEventsListenerService } from '@nx-cli/shared/data-access/ipc-events';
import { Workspace, WorkspacesStore } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['./client-layout.component.scss'],
  animations: [drawerAnimation],
})
export class ClientLayoutComponent {
  public isDrawerOpen = false;

  constructor(
    public projectsStore: ProjectsStore,
    public workspacesStore: WorkspacesStore,
    private localStorageService: UtilLocalStorageService,
    private ipcEventsListenerService: IpcEventsListenerService,
  ) {
    this.ipcEventsListenerService.initChannels();
    this.localStorageService.initData();
  }

  public onSelectProject(selectedWorkspace: Workspace): void {
    this.workspacesStore.patchState({ selectedWorkspace });
    this.projectsStore.patchState({ selectedProject: undefined })
    this.projectsStore.getAllProjects(selectedWorkspace);
    this.localStorageService.save();
  }

  public onAddProject(): void {
    this.toggleDrawer();
  }

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onCreateWorkspace(workspace: Workspace): void {
    this.workspacesStore.addWorkspace(workspace)
      .subscribe(selectedWorkspace => {
        if (selectedWorkspace) {
          this.projectsStore.getAllProjects(selectedWorkspace);
        }

        this.toggleDrawer();
        this.localStorageService.save();
      });
  }
}
