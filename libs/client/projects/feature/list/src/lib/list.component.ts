import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesStore } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  constructor(
    public projectsStore: ProjectsStore,
    public workspacesStore: WorkspacesStore,
  ) {}

  public refresh(): void {
    // this.projectsStore.getAllProjects();
  }

  public triggerSearch(keyword: string): void {
    this.projectsStore.filterProjects(keyword);
  }

  public onSelectProject(project: Project): void {
    this.projectsStore.selectProject(project);
  }

  public trackBy(index: any, item: any) {
    return item.name;
  }

  public createNgApp(): void {
    this.projectsStore.createNgApp();
  }

  public createLib(): void {
    this.projectsStore.createLib();
  }
}
