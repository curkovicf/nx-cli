import { Injectable, NgZone } from '@angular/core';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { projectsStore } from '../viewmodels/projects.store';
import { Project } from '../models/project.model';
import { take, tap } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import { ProjectsIpcApiService } from './projects-ipc-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private projectsStore: projectsStore,
    private projectsIpcApiService: ProjectsIpcApiService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
  ) {
    this.initGenericResponseChannel();
    this.initGetAllProjectsChannel();
  }

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

  /**
   *
   * @private
   */
  private initGenericResponseChannel(): void {
    this.electronService.ipcRenderer.on(IpcEvents.defaultChannel.fromElectron, (event, response: IpcResponse) => {
      const { workspacePath, error, success } = response;

      //  FIXME: Rethink this approach
      // if (success) { this.projectsIpcApiService.getAllProjects(workspacePath); }

      this.ngZone.run(() => this.snackBar.open(success || error, null));
    });
  }
}
