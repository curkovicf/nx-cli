import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data-access/models';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade,
  ) {}

  public generateComponent(generateDto: IpcEventDtos.GenerateAngularComponent): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.createComponent.fromAngular, generateDto);
  }

  public generateService(generateDto: IpcEventDtos.GenerateAngularService): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.createService.fromAngular, generateDto);
  }

  public getAllProjects(projectPath: string): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.getAllProjects.fromAngular, projectPath);
  }

  public editProject(generateDto: IpcEventDtos.EditProject): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.editProject.fromAngular, generateDto);
  }

  public deleteProject(deleteProjectDto: IpcEventDtos.DeleteProjectDto): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.deleteProject.fromAngular, deleteProjectDto);
  }

  public createProject(createAppDto: IpcEventDtos.CreateProjectDto): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.createApp.fromAngular, createAppDto);
  }

  public generateLibrary(generateLibraryDto: IpcEventDtos.GenerateAngularLibrary): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.generateLibrary.fromAngular, generateLibraryDto);
  }

  public generateApplication(generateApplicationDto: IpcEventDtos.GenerateAngularApplication): void {
    this.progressBarFacade.addNewActiveAction();
    this.electronService.ipcRenderer.send(IpcEvents.generateApplication.fromAngular, generateApplicationDto);
  }
}
