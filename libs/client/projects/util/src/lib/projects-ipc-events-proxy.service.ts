import { Injectable } from '@angular/core';
import { EventsProxyService } from '@nx-cli/client/shared/util';
import { NxWorkspace, Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { take, tap } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { MatDialog } from '@angular/material/dialog';
import { SingleInputFormComponent, SingleInputFormComponentData } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { ConfirmDialogComponent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { GenerateLibraryFormComponent } from '@nx-cli/client/projects/ui/new-project-form';

@Injectable({
  providedIn: 'root',
})
export class ProjectsIpcEventsProxyService {
  constructor(private eventsProxyService: EventsProxyService, private projectsStore: ProjectsStore, private dialog: MatDialog) {}

  public getAllProjects(): void {
    this.projectsStore.selectedWorkspace$
      .pipe(
        take(1),
        tap((nxSelectProject) => {
          if (!nxSelectProject) {
            return;
          }
          console.log(nxSelectProject);
          this.eventsProxyService.getAllProjects(nxSelectProject.path);
        })
      )
      .subscribe();
  }

  public changeSelectProject(nxProject: NxWorkspace): void {
    this.projectsStore.selectNxProject(nxProject);
    this.getAllProjects();
  }

  public generateComponent(dto: IpcEventDtos.GenerateDto): void {
    this.emitData((dto) => this.eventsProxyService.generateComponent(dto), dto);
  }

  public generateService(dto: IpcEventDtos.GenerateDto): void {
    this.emitData((dto) => this.eventsProxyService.generateService(dto), dto);
  }

  private emitData(emit: (data: any) => void, dto: any): void {
    this.projectsStore.selectedWorkspace$
      .pipe(
        take(1),
        tap(selectedNxProject => {
          const copyDto = { ...dto, workspacePath: selectedNxProject?.path };
          emit(copyDto);
        })
      ).subscribe();
  }

  public moveProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Move',
      placeholder: 'Eg. shared/ui',
      title: 'Enter new location',
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData,
        })
        .afterClosed(),
      this.projectsStore.selectedWorkspace$,
      this.projectsStore.selectedProject$,
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject, selectedProject]) => {
        if (!data) {
          return;
        }

        const generateDto: IpcEventDtos.MoveProjectDto = {
          workspacePath: selectedNxProject?.path,
          projectName: selectedProject?.name,
          projectNameInNxJson: project.nameInNxJson,
          moveTo: data.value,
        };

        this.eventsProxyService.moveProject(generateDto);
      });
  }

  public renameProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Rename',
      placeholder: 'Eg. new-name',
      title: 'Enter new name',
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData,
        })
        .afterClosed(),
      this.projectsStore.selectedWorkspace$,
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const generateDto: IpcEventDtos.RenameProjectDto = {
          workspacePath: selectedNxProject?.path,
          libPath: project.relativePath.replace(project.name, '').replace('/libs', '').replace('/apps', '').substring(1),
          projectNameInNxJson: project.nameInNxJson,
          newName: data.value.slice(0, -1),
          type: project.type,
        };

        this.eventsProxyService.renameProject(generateDto);
      });
  }

  public deleteProject(project: Project): void {
    combineLatest([this.dialog.open(ConfirmDialogComponent).afterClosed(), this.projectsStore.selectedWorkspace$])
      .pipe(take(1))
      .subscribe(([isConfirm, selectedNxProject]) => {
        if (!isConfirm) {
          return;
        }

        this.eventsProxyService.deleteProject({
          projectNameInNxJson: project.nameInNxJson,
          workspacePath: selectedNxProject?.path,
          type: project.type,
        });
      });
  }

  public createNgApp(): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Create app',
      placeholder: 'Eg. my-awesome-app',
      title: 'Enter new app name',
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData,
        })
        .afterClosed(),
      this.projectsStore.selectedWorkspace$,
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const createAppDto: IpcEventDtos.CreateProjectDto = {
          path: data.value.slice(0, -1),
          workspacePath: selectedNxProject?.path,
          type: 'app',
        };

        this.eventsProxyService.createProject(createAppDto);
      });
  }

  public createLib(): void {
    combineLatest([this.dialog.open(GenerateLibraryFormComponent).afterClosed(), this.projectsStore.selectedWorkspace$])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const createLibDto: IpcEventDtos.CreateProjectDto = {
          path: data.artifactName[data.artifactName.length - 1] === '/' ? data.artifactName.slice(0, -1) : data.artifactName,
          workspacePath: selectedNxProject?.path,
          flags: data.flags,
          type: 'lib',
        };

        this.eventsProxyService.createProject(createLibDto);
      });
  }
}
