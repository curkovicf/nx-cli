import {Injectable} from '@angular/core';
import {combineLatest} from 'rxjs';
import {first} from 'rxjs/operators';
import {WorkspacesFacade} from '@nx-cli/client/workspaces/data-access';
import {ProjectsFacade} from '@nx-cli/client/projects/data-access';
import {Workspace} from '@nx-cli/shared/data-access/models';

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
      this.workspacesFacade.selectedWorkspace$,
    ])
      .pipe(first())
      .subscribe(([workspaces, selectedWorkspace]) =>
        localStorage.setItem(this.key, JSON.stringify({workspaces, selectedWorkspace})),
      );
  }

  public initData(): void {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return;
    }

    const {workspaces, selectedWorkspace}: StoredData = JSON.parse(data);

    this.workspacesFacade.setWorkspacesState({workspaces, selectedWorkspace});
  }
}
