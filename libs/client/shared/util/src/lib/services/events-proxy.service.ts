import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { take, tap } from 'rxjs/operators';
import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';

@Injectable({
  providedIn: 'root',
})
export class EventsProxyService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private projectsStore: ProjectsStore,
    private ngZone: NgZone
  ) {
    this.initChannels();
  }

  private initChannels(): void {
    //  Get all projects result
    this.electronService.ipcRenderer.on(IpcEvents.getAllProjects.fromElectron, (event, response: IpcResponseData<Project[]>) => {
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
    });

    //  Default response from electron
    this.electronService.ipcRenderer.on(IpcEvents.defaultChannel.fromElectron, (event, response: IpcResponse) => {
      const { workspacePath, error, success } = response;

      if (success) {
        this.getAllProjects(workspacePath);
      }

      this.ngZone.run(() => this.snackBar.open(success || error, null));
    });
  }

  public generateComponent(generateDto: IpcEventDtos.GenerateDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.createComponent.fromAngular, generateDto);
  }

  public generateService(generateDto: IpcEventDtos.GenerateDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.createService.fromAngular, generateDto);
  }

  public getAllProjects(projectPath: string): void {
    this.electronService.ipcRenderer.send(IpcEvents.getAllProjects.fromAngular, projectPath);
  }

  public moveProject(generateDto: IpcEventDtos.MoveProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.moveProject.fromAngular, generateDto);
  }

  public renameProject(generateDto: IpcEventDtos.RenameProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.renameProject.fromAngular, generateDto);
  }

  public deleteProject(deleteProjectDto: IpcEventDtos.DeleteProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.deleteProject.fromAngular, deleteProjectDto);
  }

  public createProject(createAppDto: IpcEventDtos.CreateProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.createApp.fromAngular, createAppDto);
  }
}
