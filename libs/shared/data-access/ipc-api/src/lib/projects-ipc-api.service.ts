import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcApiService {
  constructor(private electronService: ElectronService) {}

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
    console.log(deleteProjectDto);
    this.electronService.ipcRenderer.send(IpcEvents.deleteProject.fromAngular, deleteProjectDto);
  }

  public createProject(createAppDto: IpcEventDtos.CreateProjectDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.createApp.fromAngular, createAppDto);
  }

  public generateLibrary(generateLibraryDto: IpcEventDtos.GenerateLibrary): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateLibrary.fromAngular, generateLibraryDto);
  }
}
