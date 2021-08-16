import { Injectable } from '@angular/core';
import { EventsProxyService } from '@nx-cli/client/shared/util/ipc-events-proxy';
import { NxProject, Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { GenerateComponentFormComponent } from '@nx-cli/client/projects/ui/generate-component-form';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { MatDialog } from '@angular/material/dialog';
import { GenerateServiceFormComponent } from '@nx-cli/client/projects/ui/generate-service-form';
import { SingleInputFormComponent, SingleInputFormComponentData } from '@nx-cli/client/projects/ui/single-input-form';
import { ConfirmDialogComponent } from '@nx-cli/client/shared/ui/confirm-dialog';

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

        this.eventsProxyService.generateService(generateDto);
      });
  }

  public moveProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Move',
      placeholder: 'Eg. shared/ui',
      title: 'Enter new location'
    };

    combineLatest([
      this.dialog.open(
        SingleInputFormComponent,
        {
          data: moveDialogData
        }
      ).afterClosed(),
      this.projectsStore.selectedNxProject$,
      this.projectsStore.selectedProject$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject, selectedProject]) => {
        if (!data) { return };

        const generateDto: IpcEventDtos.MoveProjectDto = {
          nxProjectRootPath: selectedNxProject?.path,
          projectName: selectedProject?.name,
          projectNameInNxJson: project.nameInNxJson,
          moveTo: data.value
        };

        this.eventsProxyService.moveProject(generateDto);
      });
  }

  public renameProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Rename',
      placeholder: 'Eg. new-name',
      title: 'Enter new name'
    };

    combineLatest([
      this.dialog.open(
        SingleInputFormComponent,
        {
          data: moveDialogData
        }
      ).afterClosed(),
      this.projectsStore.selectedNxProject$,
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) { return };

        const generateDto: IpcEventDtos.RenameProjectDto = {
          nxProjectRootPath: selectedNxProject?.path,
          libPath: project.relativePath.replace(project.name, '').replace('/libs', '').substring(1),
          projectNameInNxJson: project.nameInNxJson,
          newName: data.value.slice(0,-1)
        };

        this.eventsProxyService.renameProject(generateDto);
      });
  }

  public deleteProject(project: Project): void {
    combineLatest([
      this.dialog.open(ConfirmDialogComponent).afterClosed(),
      this.projectsStore.selectedNxProject$
    ])
      .pipe(take(1))
      .subscribe(([isConfirm, selectedNxProject]) => {
        if (!isConfirm) {
          return;
        }

        this.eventsProxyService.deleteProject({
          projectNameInNxJson: project.nameInNxJson,
          nxProjectRootPath: selectedNxProject?.path,
          projectType: project.type
        });
      });
  }
}
