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
    if (!workspace) { return; }

    this.projectsIpcApiService.getAllProjects(workspace.path);
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
      this.workspacesStore.getCurrentWorkspacePath()
    ])
      .pipe(take(1))
      .subscribe(([data, workspacePath]) => {
        if (!data) { return; }

        const createAppDto: IpcEventDtos.CreateProjectDto = {
          workspacePath,
          path: data.value.slice(0, -1),
          type: 'app'
        };

        this.projectsIpcApiService.createProject(createAppDto);
      });
  }

  public createLib(): void {
    combineLatest([
      this.dialog.open(GenerateLibraryFormComponent).afterClosed(),
      this.workspacesStore.getCurrentWorkspacePath()
    ])
      .pipe(take(1))
      .subscribe(([data, workspacePath]) => {
        if (!data) { return; }

        const createLibDto: IpcEventDtos.CreateProjectDto = {
          workspacePath,
          path:
            data.artifactName[data.artifactName.length - 1] === '/'
              ? data.artifactName.slice(0, -1)
              : data.artifactName,
          flags: data.flags,
          type: 'lib'
        };

        this.projectsIpcApiService.createProject(createLibDto);
      });
  }

  public renameProject(dto: Partial<IpcEventDtos.RenameProjectDto>): void {
    this.execute((dto) => this.projectsIpcApiService.renameProject(dto), dto);
  }

  public moveProject(dto: Partial<IpcEventDtos.MoveProjectDto>): void {
    this.execute((dto) => this.projectsIpcApiService.moveProject(dto), dto);
  }

  public generateComponent(dto: IpcEventDtos.GenerateDto): void {
    this.execute((dto) => this.projectsIpcApiService.generateComponent(dto), dto);
  }

  public generateService(dto: IpcEventDtos.GenerateDto): void {
    this.execute((dto) => this.projectsIpcApiService.generateService(dto), dto);
  }

  private execute(generateCallback: (data: any) => void, dto: any): void {
    this.workspacesStore.getCurrentWorkspacePath()
      .pipe(
        take(1),
        tap(workspacePath => {
          const copyDto = { ...dto, workspacePath };
          generateCallback(copyDto);
        })
      ).subscribe();
  }
}
