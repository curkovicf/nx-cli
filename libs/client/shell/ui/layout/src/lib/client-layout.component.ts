import { Component } from '@angular/core';
import { NxWorkspace, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util';
import { LocalStorageService } from '@nx-cli/client/shared/util';

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
    private localStorageService: LocalStorageService,
    private projectsIpcEventsProxyService: ProjectsIpcEventsProxyService
  ) {
    this.localStorageService.initData();
  }

  public onSelectProject(nxProject: NxWorkspace): void {
    this.projectsIpcEventsProxyService.changeSelectProject(nxProject);
    this.localStorageService.save();
  }

  public onAddProject(): void {
    this.toggleDrawer();
  }

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onSubmitNxProject(nxProject: NxWorkspace): void {
    this.projectsStore.addNxProject(nxProject).subscribe(() => {
      this.toggleDrawer();
      this.localStorageService.save();
    });
  }
}
