import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { take, tap } from 'rxjs/operators';
import { ProjectsIpcApiService } from '@nx-cli/shared/data-access/ipc-api';

@Injectable({
  providedIn: 'root'
})
export class IpcEventsListenerService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private projectsStore: ProjectsStore,
    private projectsIpcApiService: ProjectsIpcApiService,
    private ngZone: NgZone
  ) {}

  public initChannels(): void {
    this.initGenericResponseChannel();
    this.initGetAllProjectsChannel();
  }

  /**
   *
   * @private
   */
  private initGenericResponseChannel(): void {
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
  private initGetAllProjectsChannel(): void {
    this.electronService.ipcRenderer.on(IpcEvents.defaultChannel.fromElectron, (event, response: IpcResponse) => {
      const { workspacePath, error, success } = response;

      if (success) {
        this.projectsIpcApiService.getAllProjects(workspacePath);
      }

      this.ngZone.run(() => this.snackBar.open(success || error, null));
    });
  }
}
