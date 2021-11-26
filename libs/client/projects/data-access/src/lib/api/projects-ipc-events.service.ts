import {Injectable, NgZone} from '@angular/core';
import {
  Project,
  ProjectsIpcEvents,
  IpcResponses,
  ProjectsIpcDtos,
} from '@nx-cli/shared/data-access/models';
import {first, tap} from 'rxjs/operators';
import {ElectronService} from 'ngx-electron';
import {ProjectsIpcApiService} from './projects-ipc-api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WorkspacesFacade} from '@nx-cli/client/workspaces/data-access';
import {ProjectsFacade} from '../+store/projects.facade';
import {ProgressBarFacade} from '@nx-cli/client/shared/data-access';

@Injectable({
  providedIn: 'root',
})
export class ProjectsIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private workspacesFacade: WorkspacesFacade,
    private projectsFacade: ProjectsFacade,
    private projectsIpcApiService: ProjectsIpcApiService,
    private ngZone: NgZone,
    private snackBar: MatSnackBar,
    private progressBarFacade: ProgressBarFacade,
  ) {
    this.initGenericResponseChannel();
    this.initGetAllProjectsChannel();
    this.initRemoveTag();
    this.initAddTags();
  }

  /**
   *
   * @private
   */
  private initGetAllProjectsChannel(): void {
    //  Get all projects result
    this.electronService.ipcRenderer.on(
      ProjectsIpcEvents.getAllProjects.fromElectron,
      (event, response: IpcResponses.ResponseWithData<Project[]>) => {
        //  FIXME:
        this.ngZone.run(() => {
          this.progressBarFacade.markOperationAsComplete();

          this.workspacesFacade.selectedProject$
            .pipe(
              first(),
              tap(_selectedProject => {
                const {data} = response;

                this.projectsFacade.addProjects([...data]);
                // this.projectsFacade.selectProject(data.find((project) => project.nameInNxJson === _selectedProject?.nameInNxJson));
              }),
            )
            .subscribe();
        });
      },
    );
  }

  /**
   *
   * @private
   */
  private initGenericResponseChannel(): void {
    this.electronService.ipcRenderer.on(
      ProjectsIpcEvents.defaultChannel.fromElectron,
      (event, response: IpcResponses.Response) => {
        const {workspacePath, error, success} = response;

        this.progressBarFacade.markOperationAsComplete();

        if (success) {
          this.projectsIpcApiService.getAllProjects(workspacePath);
        }

        this.ngZone.run(() => this.snackBar.open(success || error, null));
      },
    );
  }

  /**
   *
   * @private
   */
  private initRemoveTag(): void {
    this.electronService.ipcRenderer.on(
      ProjectsIpcEvents.removeTag.fromElectron,
      (event, response: IpcResponses.ResponseWithData<ProjectsIpcDtos.RemoveTag>) => {
        const {error, success} = response;

        if (success) {
          this.ngZone.run(() => this.projectsFacade.removeTag(response.data));

          return;
        }

        this.ngZone.run(() => {
          this.snackBar.open(success || error, null);
          // this.progressBarFacade.markOperationAsComplete();
        });
      },
    );
  }

  /**
   *
   * @private
   */
  private initAddTags(): void {
    this.electronService.ipcRenderer.on(
      ProjectsIpcEvents.addTag.fromElectron,
      (event, response: IpcResponses.ResponseWithData<ProjectsIpcDtos.AddTagResult>) => {
        const {error, success, data} = response;

        if (success) {
          console.log(response);
          this.ngZone.run(() => this.projectsFacade.addTags(data));

          return;
        }

        this.ngZone.run(() => this.snackBar.open(success || error, null));
      },
    );
  }
}
