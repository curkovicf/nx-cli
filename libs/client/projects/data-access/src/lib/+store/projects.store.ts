import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { Workspace, WorkspacesStore } from '@nx-cli/client/workspaces/data-access';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';
import {
  SingleInputFormComponent,
  SingleInputFormComponentData
} from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { combineLatest } from 'rxjs';
import { ConfirmDialogComponent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { GenerateLibraryFormComponent } from '@nx-cli/client/projects/ui/new-project-form';
import { ProjectsIpcApiService } from '@nx-cli/shared/data-access/ipc-api';
import { MatDialog } from '@angular/material/dialog';

export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | undefined;
  projectsLoadedInView: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsStore extends ComponentStore<ProjectsState> {
  readonly projects$ = this.select((state) => state.projects);
  readonly projectsLoadedInView$ = this.select((state) => state.projectsLoadedInView);
  readonly selectedProject$ = this.select((state) => state.selectedProject);

  constructor(
    private projectsIpcApiService: ProjectsIpcApiService,
    private dialog: MatDialog,
    private workspacesStore: WorkspacesStore
  ) {
    super(<ProjectsState>{
      projects: [],
      projectsLoadedInView: [],
      selectedProject: undefined
    });
  }

  public filterProjects(keyword: string): void {
    this.projects$
      .pipe(
        take(1),
        tap((projects) =>
          this.patchState({
            projectsLoadedInView: projects.filter((project) => project.name.includes(keyword))
          })
        )
      )
      .subscribe();
  }

  public selectProject(selectedProject: Project): void {
    this.patchState({ selectedProject });
  }


  public getAllProjects(workspace: Workspace): void {
    if (!workspace) {
      return;
    }

    this.projectsIpcApiService.getAllProjects(workspace.path);
  }

  public generateComponent(dto: IpcEventDtos.GenerateDto): void {
    this.emitData((dto) => this.projectsIpcApiService.generateComponent(dto), dto);
  }

  public generateService(dto: IpcEventDtos.GenerateDto): void {
    this.emitData((dto) => this.projectsIpcApiService.generateService(dto), dto);
  }

  private emitData(emit: (data: any) => void, dto: any): void {
    this.workspacesStore.selectedWorkspace$
      .pipe(
        take(1),
        tap((selectedNxProject) => {
          const copyDto = { ...dto, workspacePath: selectedNxProject?.path };
          emit(copyDto);
        })
      )
      .subscribe();
  }

  public moveProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Move',
      placeholder: 'Eg. shared/ui',
      title: 'Enter new location'
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData
        })
        .afterClosed(),
      this.workspacesStore.selectedWorkspace$,
      this.selectedProject$
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
          moveTo: data.value
        };

        this.projectsIpcApiService.moveProject(generateDto);
      });
  }

  public renameProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Rename',
      placeholder: 'Eg. new-name',
      title: 'Enter new name'
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData
        })
        .afterClosed(),
      this.workspacesStore.selectedWorkspace$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const generateDto: IpcEventDtos.RenameProjectDto = {
          workspacePath: selectedNxProject?.path,
          libPath: project.relativePath
            .replace(project.name, '')
            .replace('/libs', '')
            .replace('/apps', '')
            .substring(1),
          projectNameInNxJson: project.nameInNxJson,
          newName: data.value.slice(0, -1),
          type: project.type
        };

        this.projectsIpcApiService.renameProject(generateDto);
      });
  }

  public deleteProject(project: Project): void {
    combineLatest([this.dialog.open(ConfirmDialogComponent).afterClosed(), this.workspacesStore.selectedWorkspace$])
      .pipe(take(1))
      .subscribe(([isConfirm, selectedNxProject]) => {
        if (!isConfirm) {
          return;
        }

        this.projectsIpcApiService.deleteProject({
          projectNameInNxJson: project.nameInNxJson,
          workspacePath: selectedNxProject?.path,
          type: project.type
        });
      });
  }

  public createNgApp(): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Create app',
      placeholder: 'Eg. my-awesome-app',
      title: 'Enter new app name'
    };

    combineLatest([
      this.dialog
        .open(SingleInputFormComponent, {
          data: moveDialogData
        })
        .afterClosed(),
      this.workspacesStore.selectedWorkspace$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const createAppDto: IpcEventDtos.CreateProjectDto = {
          path: data.value.slice(0, -1),
          workspacePath: selectedNxProject?.path,
          type: 'app'
        };

        this.projectsIpcApiService.createProject(createAppDto);
      });
  }

  public createLib(): void {
    combineLatest([this.dialog.open(GenerateLibraryFormComponent).afterClosed(), this.workspacesStore.selectedWorkspace$])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        if (!data) {
          return;
        }

        const createLibDto: IpcEventDtos.CreateProjectDto = {
          path:
            data.artifactName[data.artifactName.length - 1] === '/'
              ? data.artifactName.slice(0, -1)
              : data.artifactName,
          workspacePath: selectedNxProject?.path,
          flags: data.flags,
          type: 'lib'
        };

        this.projectsIpcApiService.createProject(createLibDto);
      });
  }
}
