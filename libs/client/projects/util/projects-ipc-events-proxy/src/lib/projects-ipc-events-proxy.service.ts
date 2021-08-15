import { Injectable } from '@angular/core';
import { EventsProxyService } from '@nx-cli/client/shared/util/ipc-events-proxy';
import { NxProject, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcEventsProxyService {
  constructor(
    private eventsProxyService: EventsProxyService,
    private projectsStore: ProjectsStore,
  ) {}

  public getAllProjects(): void {
    this.projectsStore.selectedNxProject$
      .pipe(
        take(1),
        tap(nxSelectProject => {
          if (!nxSelectProject) {
            return;
          }
          console.log(nxSelectProject);
          this.eventsProxyService.getAllProjects(nxSelectProject.path);
        })
      ).subscribe();
  }

  public changeSelectProject(nxProject: NxProject): void {
    this.projectsStore.selectNxProject(nxProject);
    this.getAllProjects();
  }
}
