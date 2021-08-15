import { Injectable } from '@angular/core';
import { NxProject, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { combineLatest } from 'rxjs';
import { ProjectsIpcEventsProxyService } from '@nx-cli/client/projects/util/projects-ipc-events-proxy';

interface StoredData {
  nxProjects: NxProject[];
  selectedNxProject: NxProject | undefined;
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private key = 'storedData';

  constructor(
    private projectsStore: ProjectsStore,
    private projectsIpcEventsProxyService: ProjectsIpcEventsProxyService,
  ) {}

  public save(): void {
    combineLatest([
      this.projectsStore.nxProjects$,
      this.projectsStore.selectedNxProject$
    ])
      .subscribe(([ nxProjects, selectedNxProject ]) => {
        const data: StoredData = { nxProjects, selectedNxProject };
        localStorage.setItem(this.key, JSON.stringify(data));
      });
  }

  public initData(): void {
    const data = localStorage.getItem(this.key);

    if (!data) { return };

    const { nxProjects, selectedNxProject }: StoredData = JSON.parse(data);

    this.projectsStore.patchState({ nxProjects, selectedNxProject });
    this.projectsIpcEventsProxyService.getAllProjects();
  }
}
