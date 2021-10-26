import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Project } from '@nx-cli/shared/data-access/models';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { combineLatest, Observable } from 'rxjs';
import { ProjectsIpcApiService } from '../api/projects-ipc-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal/portal';
import { NewAppDialogComponent } from '@nx-cli/client/projects/ui/new-app-dialog';
import { GeneratorDialogComponent } from '@nx-cli/client/projects/ui/generator-dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { ProjectsFacade } from '../+store/projects.facade';
import { AutocompleteSearchComponent } from '@nx-cli/client/shared/ui/autocomplete-search';

export interface ProjectsState {
  projectsLoadedInView: Project[];
  filterKeyword: string;
  isPopupSearchVisible: boolean;
}

@Injectable()
export class listStore extends ComponentStore<ProjectsState> {
  readonly vm$ = this.select(
    this.projectsFacade.projects$,
    this.state$,
    (projects, { filterKeyword, isPopupSearchVisible }) => ({
      projectsInView: projects.filter((project) => project.name.includes(filterKeyword)),
      isPopupSearchVisible,
    })
  );

  constructor(
    private projectsIpcApiService: ProjectsIpcApiService,
    private dialog: MatDialog,
    private workspacesFacade: WorkspacesFacade,
    private projectsFacade: ProjectsFacade
  ) {
    super(<ProjectsState>{
      projectsLoadedInView: [],
      filterKeyword: '',
    });
  }

  public filterProjects(filterKeyword: string): void {
    this.patchState({ filterKeyword });
  }

  public fetchProjects(): void {
    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        filter((data) => !!data)
      )
      .subscribe((workspace) => this.projectsIpcApiService.getAllProjects(workspace.path));
  }

  public selectProject(selectedProject: Project): void {
    this.projectsFacade.selectProject(selectedProject);
  }

  public createApplication(): void {
    this.openDialog(NewAppDialogComponent).subscribe(([data, workspacePath]) =>
      this.projectsIpcApiService.generateApplication({ ...data, workspacePath })
    );
  }

  public createLibrary(): void {
    this.openDialog(GeneratorDialogComponent, { maxHeight: '90vh' }).subscribe(([data, workspacePath]) => {
      console.log(data);
      console.log(workspacePath);
      this.projectsIpcApiService.generateLibrary({ ...data, workspacePath });
    });
  }

  public startDepGraph(): void {
    this.workspacesFacade
      .getSelectedWorkspacePath()
      .subscribe((workspacePath) => this.projectsIpcApiService.startDepGraph(workspacePath));
  }

  public togglePopupSearch(): void {
    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        switchMap(selectedWorkspace => this.dialog
          .open(AutocompleteSearchComponent, { data: selectedWorkspace.generators.map(g => g.name) })
          .afterClosed()
          .pipe(
            switchMap(selectedGeneratorName => this.openDialog(GeneratorDialogComponent, {
              data: selectedWorkspace.generators.find(g => g.name === selectedGeneratorName),
              maxHeight: '90vh'
            }))
          )
        )
      )
      .subscribe();
  }

  //  TODO: Fix duplication
  private openDialog(component: ComponentType<unknown>, config?: MatDialogConfig): Observable<any> {
    return combineLatest([
      this.dialog.open(component, config).afterClosed(),
      this.workspacesFacade.selectedWorkspace$.pipe(
        first(),
        map((w) => w?.path)
      ),
    ]).pipe(
      first(),
      filter(([data, workspacePath]) => !!data)
    );
  }
}
