import { Component } from '@angular/core';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util';
import { MatDialog } from '@angular/material/dialog';
import { NewComponentFormComponent } from '@nx-cli/client/projects/ui/new-component-form';
import { tap } from 'rxjs/operators';
import { GenerateServiceFormComponent } from '@nx-cli/client/projects/ui/new-service-form';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: ProjectsStore,
    private projectsEventsProxyService: ProjectsIpcEventsProxyService,
    private dialog: MatDialog,
  ) {}

  public generateComponent(project: Project): void {
    this.dialog.open(NewComponentFormComponent)
      .afterClosed()
      .pipe(
        tap(data => this.projectsEventsProxyService.generateComponent({
          ...data,
          projectName: project.nameInNxJson
        }))
      )
      .subscribe();
  }

  public generateService(project: Project): void {
    this.dialog.open(GenerateServiceFormComponent)
      .afterClosed()
      .pipe(
        tap(data => this.projectsEventsProxyService.generateService({
          ...data,
          projectName: project.nameInNxJson
        }))
      )
      .subscribe();
  }

  public moveProject(project: Project): void {
    this.projectsEventsProxyService.moveProject(project);
  }

  public renameProject(project: Project): void {
    this.projectsEventsProxyService.renameProject(project);
  }

  public deleteLib(project: Project): void {
    this.projectsEventsProxyService.deleteProject(project);
  }
}
