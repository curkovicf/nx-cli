import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util/projects-ipc-events-proxy';

@Component({
  selector: 'dev-workspace-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  constructor(
    public projectsStore: ProjectsStore,
    private projectsIpcEventsProxyService: ProjectsIpcEventsProxyService,
  ) {}

  public refresh(): void {
    this.projectsIpcEventsProxyService.getAllProjects();
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
    this.projectsIpcEventsProxyService.createNgApp();
  }

  public createLib(): void {
    this.projectsIpcEventsProxyService.createLib();
  }
}
