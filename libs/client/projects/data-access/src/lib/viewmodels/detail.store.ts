import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { ProjectsFacade } from '../+store/projects.facade';
import { Project } from '@nx-cli/shared/data-access/models';
import { ProjectsIpcApiService } from '../api/projects-ipc-api.service';
import { NewComponentDialogComponent } from '@nx-cli/client/projects/ui/new-component-dialog';
import { NewServiceFormComponent } from '@nx-cli/client/projects/ui/new-service-dialog';
import { EditProjectDialogComponent } from '@nx-cli/client/projects/ui/edit-project-dialog';
import { ConfirmDialogComponent, ConfirmDialogContent } from '@nx-cli/client/shared/ui/confirm-dialog';
import { ComponentType } from '@angular/cdk/portal/portal';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { combineLatest, Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

export interface DetailState {
  tabs: string[];
  activeTab: string;
  selectedProject: Project;
}

@Injectable()
export class DetailStore extends ComponentStore<DetailState> {
  readonly vm$ = this.select(
    this.projectsFacade.selectedProject$,
    this.state$,
    (selectedProject, { tabs, activeTab }) => ({ selectedProject, tabs, activeTab })
  );

  constructor(
    private projectsFacade: ProjectsFacade,
    private dialog: MatDialog,
    private workspacesFacade: WorkspacesFacade,
    private projectsIpcApiService: ProjectsIpcApiService,
  ) {
    super({
      tabs: ['Folder Tree', 'Nx tags'],
      activeTab: 'Folder Tree',
      selectedProject: null
    });
  }

  public switchTab(activeTab: string): void {
    this.patchState({ activeTab });
  }

  public deleteProject(project: Project): void {
    const data: ConfirmDialogContent = {
      title: 'WARNING: Are you sure you want to delete project ?',
      bodyText: 'This action is irreversible.',
      isConfirmDialog: true
    };

    this.openDialog(ConfirmDialogComponent, { data }).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.deleteProject({
        workspacePath,
        projectNameInNxJson: project.nameInNxJson,
        type: project.type
      })
    );
  }

  public generateComponent(project: Project): void {
    this.openDialog(NewComponentDialogComponent).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.generateComponent({
        ...data,
        workspacePath,
        project: project.nameInNxJson
      })
    );
  }

  public generateService(project: Project): void {
    this.openDialog(NewServiceFormComponent).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.generateService({
        ...data,
        workspacePath,
        project: project.nameInNxJson
      })
    );
  }

  public editProject(project: Project): void {
    const currName = project.name;
    const currDirectory = project.relativePath;

    this.openDialog(EditProjectDialogComponent, { data: { currName, currDirectory } })
      .subscribe(([data, workspacePath]) =>
        this.projectsIpcApiService.editProject({
          ...data,
          workspacePath,
          project: project.nameInNxJson
        })
      );
  }

  private openDialog(component: ComponentType<unknown>, config?: MatDialogConfig): Observable<any> {
    return combineLatest([
      this.dialog.open(component, config).afterClosed(),
      this.workspacesFacade.selectedWorkspace$.pipe(map((w) => w?.path)),
    ]).pipe(
      first(),
      filter(([data, workspacePath]) => !!data || !workspacePath)
    );
  }
}
