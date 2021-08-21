import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { NxWorkspace } from '../models/workspace.model';
import { Observable } from 'rxjs';

export interface ProjectsState {
  workspaces: NxWorkspace[];
  selectedWorkspace: NxWorkspace | undefined;
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
  readonly selectedNxProject$ = this.select((state) => state.selectedWorkspace);
  readonly nxProjects$ = this.select((state) => state.workspaces);

  constructor() {
    super(<ProjectsState>{
      projects: [],
      projectsLoadedInView: [],
      selectedProject: undefined,
      workspaces: [],
      selectedWorkspace: undefined,
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

  public addNxProject(nxProject: NxWorkspace): Observable<NxWorkspace[]> {
    return this.nxProjects$.pipe(
      take(1),
      tap((nxProjects) => {
        this.patchState({ workspaces: [...nxProjects, nxProject] });

        if (nxProjects.length === 0) {
          this.patchState({ selectedWorkspace: nxProject });
        }
      })
    );
  }

  public selectProject(selectedProject: Project): void {
    this.patchState({ selectedProject });
  }

  public selectNxProject(selectedNxProject: NxWorkspace): void {
    this.patchState({ selectedWorkspace: selectedNxProject });
    this.patchState({ selectedProject: undefined });
  }
}
