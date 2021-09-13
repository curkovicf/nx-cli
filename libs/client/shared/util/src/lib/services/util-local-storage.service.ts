import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { Workspace, WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { first } from 'rxjs/operators';
import { ProjectsFacade } from '../../../../../projects/data-access/src/lib/+store/projects.facade';

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
    private projectsFacade: ProjectsFacade,
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
    //  FIXME: Get all projects on init data
    // this.projectsFacade.getAllProjects(selectedWorkspace);
  }
}
