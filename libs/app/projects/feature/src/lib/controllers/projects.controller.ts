import {ipcMain} from 'electron';
import {ProjectsService} from '../services/projects.service';
import {IController} from '@nx-cli/app/shared/util';
import {
  IpcResponses,
  ProjectsIpcEvents,
  WorkspacesIpcEvents,
} from '@nx-cli/shared/data-access/models';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';
import { AddTagResult } from 'nx-cli-osfn/lib/projects/dtos/add-tag-result.dto';
import { DeleteProjectDto } from 'nx-cli-osfn/lib/projects/dtos/delete-project.dto';
import { EditProjectDto } from 'nx-cli-osfn/lib/projects/dtos/edit-project.dto';
import { RemoveTagDto } from 'nx-cli-osfn/lib/projects/dtos/remove-tag.dto';
import { TagDto } from 'nx-cli-osfn/lib/projects/dtos/tag.dto';
import { GenerateArtifactDto } from 'nx-cli-osfn/lib/projects/dtos/generate-artifact.dto';

export class ProjectsController implements IController {
  private projectsService = new ProjectsService();

  public initRoutes(): void {
    this.initGetAllProjects();
    this.initDeleteProject();
    this.initEditProject();
    this.initStartDepGraph();
    this.initRemoveTag();
    this.initAddTag();
    this.initGenerateArtifact();

    console.warn('\n********** Init Projects Controller');
  }

  private initGetAllProjects(): void {
    ipcMain.on(
      ProjectsIpcEvents.getAllProjects.fromAngular,
      async (event, workspacePath: string) => {
        const response: IpcResponses.ResponseWithData<Project[]> =
          await this.projectsService.getAllProjects(workspacePath);
        event.sender.send(ProjectsIpcEvents.getAllProjects.fromElectron, response);
      },
    );
  }

  private initDeleteProject(): void {
    ipcMain.on(
      ProjectsIpcEvents.deleteProject.fromAngular,
      async (event, dto: DeleteProjectDto) => {
        const response: IpcResponses.ResponseWithLogs =
          await this.projectsService.deleteProject(dto);
        event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
        event.sender.send(
          WorkspacesIpcEvents.loggingChannel.fromElectron,
          response.logResponse,
        );
      },
    );
  }

  private initEditProject(): void {
    ipcMain.on(
      ProjectsIpcEvents.editProject.fromAngular,
      async (event, dto: EditProjectDto) => {
        const response: IpcResponses.ResponseWithLogs =
          await this.projectsService.editProject(dto);
        event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
        event.sender.send(
          WorkspacesIpcEvents.loggingChannel.fromElectron,
          response.logResponse,
        );
      },
    );
  }

  private initStartDepGraph() {
    ipcMain.on(
      ProjectsIpcEvents.startDepGraph.fromAngular,
      async (event, workspacePath: string) => {
        const response: IpcResponses.Response = await this.projectsService.startDepGraph(
          workspacePath,
        );
        event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response);
      },
    );
  }

  private initRemoveTag(): void {
    ipcMain.on(
      ProjectsIpcEvents.removeTag.fromAngular,
      async (event, dto: RemoveTagDto) => {
        const response: IpcResponses.ResponseWithData<RemoveTagDto> =
          await this.projectsService.removeTag(dto);
        event.sender.send(ProjectsIpcEvents.removeTag.fromElectron, response);
      },
    );
  }

  private initAddTag(): void {
    ipcMain.on(
      ProjectsIpcEvents.addTag.fromAngular,
      async (event, dto: TagDto) => {
        const response: IpcResponses.ResponseWithData<AddTagResult> =
          await this.projectsService.addTag(dto);
        event.sender.send(ProjectsIpcEvents.addTag.fromElectron, response);
      },
    );
  }

  private initGenerateArtifact(): void {
    ipcMain.on(
      ProjectsIpcEvents.generateArtifact.fromAngular,
      async (event, dto: GenerateArtifactDto) => {
        const response: IpcResponses.ResponseWithLogs =
          await this.projectsService.generateArtifact(dto);
        event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
        event.sender.send(
          WorkspacesIpcEvents.loggingChannel.fromElectron,
          response.logResponse,
        );
      },
    );
  }
}
