import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { filter, take, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { Workspace, WorkspacesStore } from '@nx-cli/client/workspaces/data-access';
import { combineLatest, Observable } from 'rxjs';
import { ConfirmDialogComponent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { ProjectsIpcApiService } from '@nx-cli/shared/data-access/ipc-api';
import { MatDialog } from '@angular/material/dialog';
import { NewComponentDialogComponent } from '@nx-cli/client/projects/ui/new-component-dialog';
import { ComponentType } from '@angular/cdk/portal/portal';
import { NewServiceFormComponent } from '@nx-cli/client/projects/ui/new-service-dialog';
import { MoveProjectDialogComponent } from '@nx-cli/client/projects/ui/move-project-dialog';
import { RenameProjectFormComponent } from '@nx-cli/client/projects/ui/rename-project-dialog';
import { NewAppDialogComponent } from '@nx-cli/client/projects/ui/new-app-dialog';
import { NewLibDialogComponent } from '@nx-cli/client/projects/ui/new-lib-dialog';

export interface ProjectsState {
  projects: Project[];
  selectedProject: Project | undefined;
  projectsLoadedInView: Project[];
}

@Injectable({
  providedIn: 'root',
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
      selectedProject: undefined,
    });
  }

  public filterProjects(keyword: string): void {
    this.projects$
      .pipe(
        take(1),
        tap((projects) =>
          this.patchState({
            projectsLoadedInView: projects.filter((project) => project.name.includes(keyword)),
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

  public deleteProject(project: Project): void {
    this.openDialog(ConfirmDialogComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.deleteProject({
        workspacePath,
        projectNameInNxJson: project.nameInNxJson,
        type: project.type,
      });
    });
  }

  public createNgApp(): void {
    this.openDialog(NewAppDialogComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.createProject({
        workspacePath,
        path: data.value.slice(0, -1),
        type: 'app',
      });
    });
  }

  public createLib(): void {
    this.openDialog(NewLibDialogComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.createProject({
        workspacePath,
        path: data.value[data.value.length - 1] === '/' ? data.value.slice(0, -1) : data.value,
        flags: data.flags,
        type: 'lib',
      });
    });
  }

  public renameProject(project: Project): void {
    this.openDialog(RenameProjectFormComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      console.log('HERE ', data, workspacePath);

      this.projectsIpcApiService.renameProject({
        workspacePath,
        projectNameInNxJson: project.nameInNxJson,
        type: project.type,
        newPath: project.relativePath
          .replace('libs', '')
          .replace('apps', '')
          .replace(`${project.name}`, `${data.value}`)
          .substring(2)
          .slice(0, -1),
        oldPath: project.path,
      });
    });
  }

  public moveProject(project: Project): void {
    this.openDialog(MoveProjectDialogComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.moveProject({
        workspacePath,
        projectNameInNxJson: project.nameInNxJson,
        projectName: project.name,
        moveTo: data.value,
        oldPath: project.path,
      });
    });
  }

  public generateComponent(project: Project): void {
    this.openDialog(NewComponentDialogComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.generateComponent({
        ...data,
        workspacePath,
        projectName: project.nameInNxJson,
      });
    });
  }

  public generateService(project: Project): void {
    this.openDialog(NewServiceFormComponent).subscribe(([data, workspacePath]) => {
      if (!data) {
        return;
      }

      this.projectsIpcApiService.generateService({
        ...data,
        workspacePath,
        projectName: project.nameInNxJson,
      });
    });
  }

  private openDialog(component: ComponentType<unknown>): Observable<any> {
    return combineLatest([
      this.dialog.open(component).afterClosed(),
      this.workspacesStore.getCurrentWorkspacePath(),
    ]).pipe(
      take(1),
      filter(([data, workspacePath]) => data !== undefined) //  Investigate why this doesn't work
    );
  }
}
