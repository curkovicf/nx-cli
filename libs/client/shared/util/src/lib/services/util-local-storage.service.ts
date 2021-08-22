import { Injectable } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { combineLatest } from 'rxjs';
import { Workspace, WorkspacesStore } from '@nx-cli/client/workspaces/data-access';

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
    private workspacesStore: WorkspacesStore,
  ) {}

  public save(): void {
    combineLatest([this.workspacesStore.workspaces$, this.workspacesStore.selectedWorkspace$]).subscribe(([workspaces, selectedWorkspace]) => {
      const data: StoredData = { workspaces, selectedWorkspace };
      localStorage.setItem(this.key, JSON.stringify(data));
    });
  }

  public initData(): void {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return;
    }

    const { workspaces, selectedWorkspace }: StoredData = JSON.parse(data);

    this.workspacesStore.patchState({ workspaces, selectedWorkspace });
    this.projectsStore.getAllProjects(selectedWorkspace);
  }
}
