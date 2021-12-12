import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { combineLatest, Observable } from 'rxjs';
import { ProjectsIpcApiService } from '../api/projects-ipc-api.service';
import { MatDialog } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal/portal';
import { GeneratorDialogComponent } from '@nx-cli/client/projects/ui/generator-dialog';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { ProjectsFacade } from '../+store/projects.facade';
import { AutocompleteSearchComponent } from '@nx-cli/client/shared/ui/autocomplete-search';
import { ObjectUtils } from '@nx-cli/shared/util';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';
import { NxGenerator } from 'nx-cli-osfn/lib/projects/models/nx-generator.model';

export interface ProjectsState {
  projectsLoadedInView: Project[];
  filterKeyword: string;
  isPopupSearchVisible: boolean;
}

@Injectable()
export class listStore extends ComponentStore<ProjectsState> {
  readonly vm$ = this.select(
    this.projectsFacade.projects$,
    this.workspacesFacade.selectedProject$,
    this.state$,
    (projects, selectedProject, {filterKeyword, isPopupSearchVisible}) => ({
      projectsInView: projects.filter(project => project.name.includes(filterKeyword)),
      selectedProject,
      isPopupSearchVisible,
    }),
  );

  constructor(
    private projectsIpcApiService: ProjectsIpcApiService,
    private dialog: MatDialog,
    private workspacesFacade: WorkspacesFacade,
    private projectsFacade: ProjectsFacade,
  ) {
    super(<ProjectsState>{
      projectsLoadedInView: [],
      filterKeyword: '',
    });
  }

  public filterProjects(filterKeyword: string): void {
    this.patchState({filterKeyword});
  }

  public fetchProjects(): void {
    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        filter(data => !!data),
      )
      .subscribe(workspace => this.projectsIpcApiService.getAllProjects(workspace.path));
  }

  public selectProject(selectedProject: Project): void {
    this.workspacesFacade
      .getSelectedWorkspacePath()
      .pipe(
        first(),
        tap(path => this.workspacesFacade.selectProject(path, selectedProject)),
      )
      .subscribe();
  }

  public startDepGraph(): void {
    this.workspacesFacade
      .getSelectedWorkspacePath()
      .subscribe(workspacePath =>
        this.projectsIpcApiService.startDepGraph(workspacePath),
      );
  }

  public togglePopupSearch(): void {
    combineLatest([
      this.workspacesFacade.selectedWorkspace$,
      this.projectsFacade.projects$,
    ])
      .pipe(
        first(),
        switchMap(([selectedWorkspace, projects]) =>
          this.dialog
            .open(AutocompleteSearchComponent, {
              data: selectedWorkspace.generators.map(g => g.name),
            })
            .afterClosed()
            .pipe(
              filter(selectedGeneratorName => selectedGeneratorName !== undefined),
              switchMap(selectedGeneratorName => {
                //  TODO: check if this should have generator
                const nxGenerator = ObjectUtils.deepCopy<NxGenerator>(
                  selectedWorkspace.generators.find(
                    g => g.name === selectedGeneratorName,
                  ),
                );

                nxGenerator.form.dropDowns.forEach(dropdownElement => {
                  if (dropdownElement.title === 'project') {
                    dropdownElement.items.push(
                      ...projects.map(project => project.nameInConfig),
                    );
                    dropdownElement.selectedItem = dropdownElement.items[0];
                  }
                });

                return this.openDialog(GeneratorDialogComponent, {
                  data: {nxGenerator},
                  maxHeight: '90vh',
                });
              }),
            ),
        ),
        switchMap(([nxGenerator, workspacePath]) =>
          this.workspacesFacade.selectedProject$.pipe(
            first(),
            map(selectedProject => ({
              nxGenerator,
              workspacePath,
              selectedProjectName: selectedProject?.name,
            })),
          ),
        ),
      )
      .subscribe(nxGenerator => this.projectsIpcApiService.generateArtifact(nxGenerator));
  }

  //  TODO: Fix duplication
  private openDialog(
    component: ComponentType<unknown>,
    config?: MatDialogConfig,
  ): Observable<any> {
    return combineLatest([
      this.dialog.open(component, config).afterClosed(),
      this.workspacesFacade.selectedWorkspace$.pipe(
        first(),
        map(w => w?.path),
      ),
    ]).pipe(
      first(),
      filter(([data, workspacePath]) => !!data),
    );
  }
}
