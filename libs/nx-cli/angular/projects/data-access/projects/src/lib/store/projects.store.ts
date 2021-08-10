import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { EventsProxyService } from '@dev-workspace/nx-cli/angular/shared/util-events-proxy';
import { take, tap } from 'rxjs/operators';
import { NxApp } from '../models/nx-app.model';
import { NxLibrary } from '../models/nx-library.model';
import { IpcEventDtos } from '@dev-workspace/nx-cli/shared/data-events';

export interface ProjectsState {
  apps: NxApp[];
  libs: NxLibrary[];
  selected: NxApp | NxLibrary | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectsStore extends ComponentStore<ProjectsState> {
  readonly apps$ = this.select(state => state.apps);
  readonly libs$ = this.select(state => state.libs);
  readonly selected$ = this.select(state => state.selected);

  constructor(private eventsProxyService: EventsProxyService) {
    super(<ProjectsState>{ apps: [], libs: [], selected: undefined });
  }

  public getAllProjects(): void {
    const testPath = '/home/filip/Documents/Projects/hobi/dev-workspace';

    this.eventsProxyService.getAllProjects(testPath)
      .pipe(
        take(1),
        tap((projects: IpcEventDtos.Projects) => this.patchState({ libs: projects.libs, apps: projects.apps }))
      )
      .subscribe();
  }
}
