import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar/snack-bar-config';
import { take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
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
    //  Generate component result
    this.electronService.ipcRenderer.on(IpcEvents.generateComponent.fromNode, (event, resultDto: IpcEventDtos.GenerateResultDto) => {
      const { artifactName, isSuccess, rootPath } = resultDto;
      let snackBarContent: { message: string; config: MatSnackBarConfig };

        if (isSuccess) {
          this.getAllProjects(rootPath);
          snackBarContent = {
            message: `${artifactName} has been successfully generated`,
            config: {
              panelClass: 'background-green'
            }
          };
        } else {
          snackBarContent = {
            message: `${artifactName} has not been successfully generated`,
            config: {
              panelClass: 'background-red'
            }
          };
        }

        this.ngZone.run(() => this.snackBar.open(snackBarContent.message, null, snackBarContent.config));
      }
    );

    //  Generate component result
    this.electronService.ipcRenderer.on(IpcEvents.generateService.fromNode, (event, resultDto: IpcEventDtos.GenerateResultDto) => {
      const { artifactName, isSuccess } = resultDto;
      let snackBarContent: { message: string; config: MatSnackBarConfig };

        if (isSuccess) {
          snackBarContent = {
            message: `${artifactName} has been successfully generated`,
            config: {
              panelClass: 'background-green'
            }
          };
        } else {
          snackBarContent = {
            message: `${artifactName} has not been successfully generated`,
            config: {
              panelClass: 'background-red'
            }
          };
        }

        this.ngZone.run(() => this.snackBar.open(snackBarContent.message, null, snackBarContent.config));
      }
    );

    //  Get all projects result
    this.electronService.ipcRenderer.on(IpcEvents.projects.fromNode, (event, projects: Project[]) => {
      this.ngZone.run(() => {
        this.projectsStore.selectedProject$
          .pipe(
            take(1),
            tap(_selectedProject => {
              this.projectsStore.patchState({
                projects: [...projects],
                projectsLoadedInView: [...projects],
                selectedProject: projects.find(project => project.nameInNxJson === _selectedProject?.nameInNxJson)
              });
            })
          ).subscribe();
      })
    });

    //  Move project result
    this.electronService.ipcRenderer.on(IpcEvents.moveProject.fromNode, (event, resultDto: IpcEventDtos.GenerateResultDto) => {
        const { artifactName, isSuccess } = resultDto;
        let snackBarContent: { message: string; config: MatSnackBarConfig };

        if (isSuccess) {
          this.getAllProjects(resultDto.rootPath);
          snackBarContent = {
            message: `${artifactName} has been successfully moved`,
            config: {
              panelClass: 'background-green'
            }
          };
        } else {
          snackBarContent = {
            message: `${artifactName} has not been successfully moved`,
            config: {
              panelClass: 'background-red'
            }
          };
        }

        this.ngZone.run(() => this.snackBar.open(snackBarContent.message, null, snackBarContent.config));
      }
    );
  }

  public generateComponent(generateDto: IpcEventDtos.GenerateDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateComponent.fromAngular, generateDto);
  }

  public generateService(generateDto: IpcEventDtos.GenerateDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateService.fromAngular, generateDto);
  }

  public getAllProjects(projectPath: string): void {
    this.electronService.ipcRenderer.send(IpcEvents.projects.fromAngular, projectPath);
  }

  public moveProject(generateDto: IpcEventDtos.MoveProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.moveProject.fromAngular, generateDto);
  }
}
