import { Injectable, NgZone } from '@angular/core';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { ProjectsStore } from '../+store/projects.store';
import { Project } from '../models/project.model';
import { take, tap } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import { ProjectsIpcApiService } from './projects-ipc-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private projectsStore: ProjectsStore,
    private projectsIpcApiService: ProjectsIpcApiService,
    private ngZone: NgZone
  ) {}

  /**
   *
   * @private
   */
  private initGetAllProjectsChannel(): void {
    //  Get all projects result
    this.electronService.ipcRenderer.on(
      IpcEvents.getAllProjects.fromElectron,
      (event, response: IpcResponseData<Project[]>) => {
        this.ngZone.run(() => {
          this.projectsStore.selectedProject$
            .pipe(
              take(1),
              tap((_selectedProject) => {
                const { data } = response;

                this.projectsStore.patchState({
                  projects: [...data],
                  projectsLoadedInView: [...data],
                  selectedProject: data.find((project) => project.nameInNxJson === _selectedProject?.nameInNxJson),
                });

              })
            )
            .subscribe();
        });
      }
    );
  }
}
