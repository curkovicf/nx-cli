import {Injectable} from '@angular/core';
import {ComponentStore} from '@ngrx/component-store';
import {ProjectsFacade} from '../+store/projects.facade';
import {ProjectsIpcApiService} from '../api/projects-ipc-api.service';
import {EditProjectDialogComponent} from '@nx-cli/client/projects/ui/edit-project-dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogContent,
} from '@nx-cli/client/shared/ui/confirm-dialog';
import {ComponentType} from '@angular/cdk/portal/portal';
import {MatDialogConfig} from '@angular/material/dialog/dialog-config';
import {combineLatest, Observable} from 'rxjs';
import {filter, first, map, tap} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
import {WorkspacesFacade} from '@nx-cli/client/workspaces/data-access';
import {NewTagDialogComponent} from '@nx-cli/client/projects/ui/new-tag-dialog';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';

export interface DetailState {
  tabs: string[];
  activeTab: string;
  selectedProject: Project;
}

@Injectable()
export class DetailStore extends ComponentStore<DetailState> {
  readonly vm$ = this.select(
    this.workspacesFacade.selectedProject$,
    this.state$,
    (selectedProject, {tabs, activeTab}) => ({selectedProject, tabs, activeTab}),
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
      selectedProject: null,
    });
  }

  public switchTab(activeTab: string): void {
    this.patchState({activeTab});
  }

  public deleteProject(project: Project): void {
    const data: ConfirmDialogContent = {
      title: 'WARNING: Are you sure you want to delete project ?',
      bodyText: 'This action is irreversible.',
      isConfirmDialog: true,
    };

    this.openDialog(ConfirmDialogComponent, {data}).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.deleteProject({
        workspacePath,
        projectNameInNxJson: project.nameInConfig,
        type: project.type,
      }),
    );
  }

  public editProject(project: Project): void {
    const currName = project.name;
    const currDirectory = project.relativePath;

    this.openDialog(EditProjectDialogComponent, {
      data: {currName, currDirectory},
    }).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.editProject({
        ...data,
        workspacePath,
        project: project.nameInConfig,
      }),
    );
  }

  public addNewTag(): void {
    combineLatest([
      this.openDialog(NewTagDialogComponent),
      this.workspacesFacade.selectedProject$,
      this.workspacesFacade.getSelectedWorkspacePath(),
    ])
      .pipe(
        first(),
        tap(([tags, selectedProject, workspacePath]) => {
          if (!tags[0]) {
            return;
          } else if (selectedProject.tags.includes(tags[0])) {
            const data: ConfirmDialogContent = {
              title: 'ALERT: Tag already exists in this project.',
              bodyText: 'Please try again.',
              isConfirmDialog: false,
            };

            this.openDialog(ConfirmDialogComponent, {data}).subscribe();

            return;
          }

          this.projectsIpcApiService.addTag({
            workspacePath,
            tags: [tags[0]], //  FIXME: Check why is this arr
            selectedProjectName: selectedProject.nameInConfig,
            projectPath: selectedProject.path
          });
        }),
      )
      .subscribe();
  }

  private openDialog(
    component: ComponentType<unknown>,
    config?: MatDialogConfig,
  ): Observable<any> {
    return combineLatest([
      this.dialog.open(component, config).afterClosed(),
      this.workspacesFacade.selectedWorkspace$.pipe(map(w => w?.path)),
    ]).pipe(
      first(),
      filter(([data, workspacePath]) => !!data || !workspacePath),
    );
  }

  public removeTag(tag: string): void {
    const data: ConfirmDialogContent = {
      title: 'WARNING: Are you sure you want to delete project ?',
      bodyText: 'This action is irreversible.',
      isConfirmDialog: true,
    };

    combineLatest([
      this.openDialog(ConfirmDialogComponent, {data}),
      this.workspacesFacade.selectedProject$,
      this.workspacesFacade.selectedWorkspace$,
    ])
      .pipe(
        first(),
        tap(([isConfirm, selectedProject, selectedWorkspace]) =>
          isConfirm
            ? this.projectsIpcApiService.removeTag({
                selectedProject: selectedProject.nameInConfig,
                tagToDelete: tag,
                workspacePath: selectedWorkspace.path,
              })
            : null,
        ),
      )
      .subscribe();
  }
}
