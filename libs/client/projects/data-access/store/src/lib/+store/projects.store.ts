import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { NxProject } from '../models/nx-project.model';
import { Observable } from 'rxjs';

export interface ProjectsState {
  nxProjects: NxProject[];
  selectedNxProject: NxProject | undefined;
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
  readonly selectedNxProject$ = this.select((state) => state.selectedNxProject);
  readonly nxProjects$ = this.select((state) => state.nxProjects);

  constructor() {
    super(<ProjectsState>{
      projects: [],
      projectsLoadedInView: [],
      selectedProject: undefined,
      nxProjects: [],
      selectedNxProject: undefined
    });
  }

  public filterProjects(keyword: string): void {
    this.projects$
      .pipe(
        take(1),
        tap((projects) =>
          this.patchState({
            projectsLoadedInView: projects.filter((project) =>
              project.name.includes(keyword)
            ),
          })
        )
      )
      .subscribe();
  }

  public addNxProject(nxProject: NxProject): Observable<NxProject[]> {
    return this.nxProjects$
      .pipe(
        take(1),
        tap(nxProjects => {
          this.patchState({ nxProjects: [...nxProjects, nxProject] });

          if (nxProjects.length === 0) {
            this.patchState({ selectedNxProject: nxProject });
          }
        })
      );
  }

  public selectProject(selectedProject: Project): void {
    this.patchState({ selectedProject });
  }

  public selectNxProject(selectedNxProject: NxProject): void {
    this.patchState({ selectedNxProject });
    this.patchState({ selectedProject: undefined });
  }
}
