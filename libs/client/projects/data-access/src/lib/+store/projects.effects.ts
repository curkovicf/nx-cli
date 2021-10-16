import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchCurrentWorkspace, deleteWorkspace } from '@nx-cli/client/workspaces/data-access';
import { tap } from 'rxjs/operators';
import { ProjectsIpcApiService } from '../api/projects-ipc-api.service';
import { ProjectsFacade } from './projects.facade';

@Injectable()
export class ProjectsEffects {
  constructor(
    private actions$: Actions,
    private projectsIpcApiService: ProjectsIpcApiService,
    private projectsFacade: ProjectsFacade,
  ) {}

  fetchProjects$ = createEffect(() => this.actions$.pipe(
    ofType(switchCurrentWorkspace),
    tap(({ selectedWorkspace }) => this.projectsIpcApiService.getAllProjects(selectedWorkspace.path))),
    { dispatch: false }
  );

  deleteWorkspace$ = createEffect(() => this.actions$.pipe(
    ofType(deleteWorkspace),
    tap(() => {
      this.projectsFacade.resetProjects();
      this.projectsFacade.selectProject(null);
    })),
    { dispatch: false }
  );
}
