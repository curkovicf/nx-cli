import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Workspace } from '../models/workspace.model';

export interface WorkspacesState {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class WorkspacesStore extends ComponentStore<WorkspacesState> {
  readonly selectedWorkspace$ = this.select((state) => state.selectedWorkspace);
  readonly workspaces$ = this.select((state) => state.workspaces);

  constructor() {
    super(<WorkspacesState>{
      workspaces: [],
      selectedWorkspace: undefined,
    });
  }

  public addWorkspace(workspace: Workspace): Observable<Workspace[]> {
    return this.workspaces$.pipe(
      take(1),
      tap((nxProjects) => {
        this.patchState({ workspaces: [...nxProjects, workspace] });

        if (nxProjects.length === 0) {
          this.patchState({ selectedWorkspace: workspace });
        }
      })
    );
  }
}
