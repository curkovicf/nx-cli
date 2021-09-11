import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcApiService {
  constructor(private electronService: ElectronService) {}

  public generateComponent(generateDto: IpcEventDtos.GenerateAngularComponent): void {
    this.electronService.ipcRenderer.send(IpcEvents.createComponent.fromAngular, generateDto);
  }

  public generateService(generateDto: IpcEventDtos.GenerateAngularService): void {
    this.electronService.ipcRenderer.send(IpcEvents.createService.fromAngular, generateDto);
  }

  public getAllProjects(projectPath: string): void {
    this.electronService.ipcRenderer.send(IpcEvents.getAllProjects.fromAngular, projectPath);
  }

  public editProject(generateDto: IpcEventDtos.EditProject): void {
    this.electronService.ipcRenderer.send(IpcEvents.editProject.fromAngular, generateDto);
  }

  public deleteProject(deleteProjectDto: IpcEventDtos.DeleteProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.deleteProject.fromAngular, deleteProjectDto);
  }

  public createProject(createAppDto: IpcEventDtos.CreateProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.createApp.fromAngular, createAppDto);
  }

  public generateLibrary(generateLibraryDto: IpcEventDtos.GenerateAngularLibrary): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateLibrary.fromAngular, generateLibraryDto);
  }

  public generateApplication(generateApplicationDto: IpcEventDtos.GenerateAngularApplication): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateApplication.fromAngular, generateApplicationDto);
  }
}