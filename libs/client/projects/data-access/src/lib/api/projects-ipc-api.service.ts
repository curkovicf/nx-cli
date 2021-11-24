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

  public startDepGraph(workspacePath: string): void {
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.startDepGraph.fromAngular, workspacePath);
  }

  public removeTag(removeTagDto: ProjectsIpcDtos.RemoveTag): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.removeTag.fromAngular, removeTagDto);
  }

  public addTag(tagDto: ProjectsIpcDtos.Tag): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.addTag.fromAngular, tagDto);
  }

  public generateArtifact(nxGenerator: ProjectsIpcDtos.GenerateArtifact): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.generateArtifact.fromAngular, nxGenerator);
  }
}
