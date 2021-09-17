import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { setActiveWorkspace } from '@nx-cli/client/workspaces/data-access';
import { tap } from 'rxjs/operators';
import { ProjectsIpcApiService } from '../api/projects-ipc-api.service';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsIpcApiService: ProjectsIpcApiService,
  ) {}

  fetchProjects$ = createEffect(() => this.actions$.pipe(
    ofType(setActiveWorkspace),
    tap(({ selectedWorkspace }) => this.projectsIpcApiService.getAllProjects(selectedWorkspace.path))
  ), { dispatch: false });
}
