import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { EventsProxyService } from '@dev-workspace/nx-cli/angular/shared/util-events-proxy';
import { take, tap } from 'rxjs/operators';

export interface ProjectsState {
  projects: Project[];
  selected: Project | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsStore extends ComponentStore<ProjectsState> {
  readonly projects$ = this.select(state => state.projects);
  readonly selected$ = this.select(state => state.selected);

  constructor(private eventsProxyService: EventsProxyService) {
    super(<ProjectsState>{ projects: [], selected: undefined });
  }

  public getAllProjects(): void {
    const testPath = '/home/filip/Documents/Projects/hobi/dev-workspace';

    this.eventsProxyService.getAllProjects(testPath)
      .pipe(
        take(1),
        tap((projects: Project[]) => this.patchState({ projects }))
      )
      .subscribe();
  }
}
