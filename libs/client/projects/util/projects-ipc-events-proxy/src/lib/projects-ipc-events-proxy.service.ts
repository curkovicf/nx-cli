import { Injectable } from '@angular/core';
import { EventsProxyService } from '@nx-cli/client/shared/util/ipc-events-proxy';
import { NxProject, Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { GenerateComponentFormComponent } from '@nx-cli/client/projects/ui/generate-component-form';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { MatDialog } from '@angular/material/dialog';
import { GenerateServiceFormComponent } from '@nx-cli/client/projects/ui/generate-service-form';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcEventsProxyService {
  constructor(
    private eventsProxyService: EventsProxyService,
    private projectsStore: ProjectsStore,
    private dialog: MatDialog
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

  public generateComponent(project: Project): void {
    combineLatest([
      this.dialog.open(GenerateComponentFormComponent).afterClosed(),
      this.projectsStore.selectedNxProject$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) { return };

        const generateComponentDto: IpcEventDtos.GenerateDto = {
          nxProjectRootPath: selectedNxProject?.path,
          parentProjectNameInNxJson: project.nameInNxJson,
          ...data
        };

        this.eventsProxyService.generateComponent(generateComponentDto);
      });
  }

  public generateService(project: Project): void {
    combineLatest([
      this.dialog.open(GenerateServiceFormComponent).afterClosed(),
      this.projectsStore.selectedNxProject$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) { return };

        const generateDto: IpcEventDtos.GenerateDto = {
          nxProjectRootPath: selectedNxProject?.path,
          parentProjectNameInNxJson: project.nameInNxJson,
          ...data
        };

        console.log(generateDto);



        this.eventsProxyService.generateService(generateDto);
      });
  }
}
