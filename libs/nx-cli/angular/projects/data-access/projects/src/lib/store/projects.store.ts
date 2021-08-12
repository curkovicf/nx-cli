import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { EventsProxyService } from '@dev-workspace/nx-cli/angular/shared/util-events-proxy';
import { take, tap } from 'rxjs/operators';
import { NxProject } from '../models/nx-project.model';

export interface ProjectsState {
  projects: NxProject[];
  projectsLoadedInView: NxProject[];
  selected: NxProject | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsStore extends ComponentStore<ProjectsState> {
  readonly projects$ = this.select(state => state.projects);
  readonly projectsLoadedInView$ = this.select(state => state.projectsLoadedInView);
  readonly selected$ = this.select(state => state.selected);


  constructor(private eventsProxyService: EventsProxyService) {
    super(<ProjectsState>{ projects: [], projectsLoadedInView: [], selected: undefined });
  }

  public getAllProjects(): void {
    const testPath = '/home/filip/Documents/Projects/hobi/dev-workspace';

    this.eventsProxyService.getAllProjects(testPath)
      .pipe(
        take(1),
        tap((projects: NxProject[]) => this.patchState({ projects, projectsLoadedInView: projects }))
      )
      .subscribe();
  }

  public filterProjects(keyword: string): void {
    this.projects$
      .pipe(
        take(1),
        tap(projects => this.patchState({ projectsLoadedInView: projects.filter(project => project.name.includes(keyword)) }))
      )
      .subscribe();
  }

  public selectProject(project: NxProject): void {
    this.patchState({ selected: project });
  }
}
