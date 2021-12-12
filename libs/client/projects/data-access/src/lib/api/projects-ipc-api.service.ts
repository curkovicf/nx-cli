import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { ProjectsIpcEvents } from '@nx-cli/shared/data-access/models';
import { EditProjectDto } from 'nx-cli-osfn/lib/projects/dtos/edit-project.dto';
import { RemoveTagDto } from 'nx-cli-osfn/lib/projects/dtos/remove-tag.dto';
import { DeleteProjectDto } from 'nx-cli-osfn/lib/projects/dtos/delete-project.dto';
import { TagDto } from 'nx-cli-osfn/lib/projects/dtos/tag.dto';
import { GenerateArtifactDto } from 'nx-cli-osfn/lib/projects/dtos/generate-artifact.dto';

@Injectable({
  providedIn: 'root'
})
export class ProjectsIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade
  ) {
  }

  public getAllProjects(projectPath: string): void {
    // this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.getAllProjects.fromAngular,
      projectPath
    );
  }

  public editProject(generateDto: EditProjectDto): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.editProject.fromAngular,
      generateDto
    );
  }

  public deleteProject(deleteProjectDto: DeleteProjectDto): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.deleteProject.fromAngular,
      deleteProjectDto
    );
  }

  public startDepGraph(workspacePath: string): void {
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.startDepGraph.fromAngular,
      workspacePath
    );
  }

  public removeTag(removeTagDto: RemoveTagDto): void {
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.removeTag.fromAngular,
      removeTagDto
    );
  }

  public addTag(tagDto: TagDto): void {
    this.electronService.ipcRenderer.send(ProjectsIpcEvents.addTag.fromAngular, tagDto);
  }

  public generateArtifact(nxGenerator: GenerateArtifactDto): void {
    this.progressBarFacade.markOperationAsActive();
    this.electronService.ipcRenderer.send(
      ProjectsIpcEvents.generateArtifact.fromAngular,
      nxGenerator
    );
  }
}
