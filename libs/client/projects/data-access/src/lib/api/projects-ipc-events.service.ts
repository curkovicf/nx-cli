import { Injectable, NgZone } from '@angular/core';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { Project } from '../models/project.model';
import { first, tap } from 'rxjs/operators';
import { ElectronService } from 'ngx-electron';
import { ProjectsIpcApiService } from './projects-ipc-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { ProjectsFacade } from '../+store/projects.facade';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private workspacesFacade: WorkspacesFacade,
    private projectsFacade: ProjectsFacade,
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
        //  FIXME: Fix stuff
        this.ngZone.run(() => {
          this.projectsFacade.selectedProject$
            .pipe(
              first(),
              tap((_selectedProject) => {
                const { data } = response;

                this.projectsFacade.addProjects([...data]);
                this.projectsFacade.selectProject(data.find((project) => project.nameInNxJson === _selectedProject?.nameInNxJson));

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

      if (success) { this.projectsIpcApiService.getAllProjects(workspacePath); }

      this.ngZone.run(() => this.snackBar.open(success || error, null));
    });
  }
}
