import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { ProjectsIpcDtos, ProjectsIpcEvents } from '@nx-cli/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade,
  ) {}

  public generateComponent(generateDto: ProjectsIpcDtos.GenerateAngularComponent): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.createComponent.fromAngular, generateDto);
  }

  public generateService(generateDto: ProjectsIpcDtos.GenerateAngularService): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.createService.fromAngular, generateDto);
  }

  public getAllProjects(projectPath: string): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.getAllProjects.fromAngular, projectPath);
  }

  public editProject(generateDto: ProjectsIpcDtos.EditProject): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.editProject.fromAngular, generateDto);
  }

  public deleteProject(deleteProjectDto: ProjectsIpcDtos.DeleteProjectDto): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.deleteProject.fromAngular, deleteProjectDto);
  }

  public createProject(createAppDto: ProjectsIpcDtos.CreateProjectDto): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.createApp.fromAngular, createAppDto);
  }

  public generateLibrary(generateLibraryDto: ProjectsIpcDtos.GenerateAngularLibrary): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.generateLibrary.fromAngular, generateLibraryDto);
  }

  public generateApplication(generateApplicationDto: ProjectsIpcDtos.GenerateAngularApplication): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.generateApplication.fromAngular, generateApplicationDto);
  }

  public startDepGraph(workspacePath: string): void {
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.startDepGraph.fromAngular, workspacePath);
  }

  public removeTag(removeTagDto: ProjectsIpcDtos.RemoveTag): void {
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.removeTag.fromAngular, removeTagDto);
  }
}
