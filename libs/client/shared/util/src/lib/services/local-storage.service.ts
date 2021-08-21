import { Injectable } from '@angular/core';
import { NxWorkspace, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { combineLatest } from 'rxjs';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util';

interface StoredData {
  nxProjects: NxWorkspace[];
  selectedNxProject: NxWorkspace | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private key = 'storedData';

  constructor(private projectsStore: ProjectsStore, private projectsIpcEventsProxyService: ProjectsIpcEventsProxyService) {}

  public save(): void {
    combineLatest([this.projectsStore.nxProjects$, this.projectsStore.selectedNxProject$]).subscribe(([nxProjects, selectedNxProject]) => {
      const data: StoredData = { nxProjects, selectedNxProject };
      localStorage.setItem(this.key, JSON.stringify(data));
    });
  }

  public initData(): void {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return;
    }

    const { nxProjects, selectedNxProject }: StoredData = JSON.parse(data);

    this.projectsStore.patchState({ workspaces: nxProjects, selectedWorkspace: selectedNxProject });
    this.projectsIpcEventsProxyService.getAllProjects();
  }
}
