import { Injectable } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { combineLatest } from 'rxjs';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { first } from 'rxjs/operators';

interface StoredData {
  workspaces: Workspace[];
  selectedWorkspace: Workspace | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class UtilLocalStorageService {
  private key = 'storedData';

  constructor(
    private projectsStore: ProjectsStore,
    private workspacesFacade: WorkspacesFacade,
  ) {}

  public save(): void {
    combineLatest([
      this.workspacesFacade.workspaces$,
      this.workspacesFacade.selectedWorkspace$
    ]).pipe(first()).subscribe(([workspaces, selectedWorkspace]) => {
      const data: StoredData = { workspaces, selectedWorkspace };
      localStorage.setItem(this.key, JSON.stringify(data));
    });
  }

  public initData(): void {
    const data = localStorage.getItem(this.key);

    if (!data) { return; }

    const { workspaces, selectedWorkspace }: StoredData = JSON.parse(data);

    this.workspacesFacade.setWorkspacesState({  workspaces, selectedWorkspace  })
    this.projectsStore.getAllProjects(selectedWorkspace);
  }
}
