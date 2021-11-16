import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Workspace } from '@nx-cli/shared/data-access/models';

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

  public addWorkspace(workspace: Workspace): Observable<Workspace> {
    return this.workspaces$.pipe(
      take(1),
      map((workspaces) => {
        if (workspaces) {
          this.patchState({ workspaces: [...workspaces, workspace] });
          return null;
        }

        this.patchState({ workspaces: [workspace] });
        this.patchState({ selectedWorkspace: workspace });

        return workspace;
      })
    );
  }

  public getCurrentWorkspacePath(): Observable<string> {
    return this.selectedWorkspace$
      .pipe(
        map(workspace => workspace?.path)
      );
  }
}
