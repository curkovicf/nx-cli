import { Component } from '@angular/core';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util/projects-ipc-events-proxy';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: ProjectsStore,
    private projectsEventsProxyService: ProjectsIpcEventsProxyService,
  ) {
  }

  public generateComponent(project: Project): void {
    this.projectsEventsProxyService.generateComponent(project);
  }

  public generateService(project: Project): void {
    this.projectsEventsProxyService.generateService(project);
  }
}
