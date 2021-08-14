import { Component } from '@angular/core';
import { NxProject, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';
import { LocalStorageService } from '@nx-cli/client/shared/util/local-storage';

@Component({
  selector: 'dev-workspace-layout',
  templateUrl: './shell-layout.component.html',
  styleUrls: ['./shell-layout.component.scss'],
  animations: [drawerAnimation]
})
export class ShellLayoutComponent {
  public isDrawerOpen = false;

  constructor(
    public projectsStore: ProjectsStore,
    private localStorageService: LocalStorageService
  ) {
    this.localStorageService.initData();
  }

  public onSelectProject(nxProject: NxProject): void {
    this.projectsStore.selectNxProject(nxProject);
    this.projectsStore.getAllProjects();
    this.projectsStore.patchState({ selectedProject: undefined });
    this.localStorageService.save();
  }

  public onAddProject(): void {
    this.toggleDrawer();
  }

  public toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }

  public onSubmitNxProject(nxProject: NxProject): void {
    this.projectsStore.addNxProject(nxProject).subscribe(() => {
      this.toggleDrawer();
      this.localStorageService.save();
    });
  }
}
