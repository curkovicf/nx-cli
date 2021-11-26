import {ipcMain} from 'electron';
import {ProjectsService} from '../services/projects.service';
import {IController} from '@nx-cli/app/shared/util';
import {IProjectsService} from '../services/projects-service.interface';
import {
  IpcResponses,
  Project,
  ProjectsIpcDtos,
  ProjectsIpcEvents,
  WorkspacesIpcEvents,
} from '@nx-cli/shared/data-access/models';
import RemoveTag = ProjectsIpcDtos.RemoveTag;

export class ProjectsController implements IController {
  private projectsService: IProjectsService = new ProjectsService();

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
      async (event, dto: ProjectsIpcDtos.DeleteProjectDto) => {
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
      async (event, dto: ProjectsIpcDtos.EditProject) => {
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
      async (event, dto: ProjectsIpcDtos.RemoveTag) => {
        const response: IpcResponses.ResponseWithData<RemoveTag> =
          await this.projectsService.removeTag(dto);
        event.sender.send(ProjectsIpcEvents.removeTag.fromElectron, response);
      },
    );
  }

  private initAddTag(): void {
    ipcMain.on(
      ProjectsIpcEvents.addTag.fromAngular,
      async (event, dto: ProjectsIpcDtos.Tag) => {
        const response: IpcResponses.ResponseWithData<ProjectsIpcDtos.AddTagResult> =
          await this.projectsService.addTag(dto);
        event.sender.send(ProjectsIpcEvents.addTag.fromElectron, response);
      },
    );
  }

  private initGenerateArtifact(): void {
    ipcMain.on(
      ProjectsIpcEvents.generateArtifact.fromAngular,
      async (event, dto: ProjectsIpcDtos.GenerateArtifact) => {
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
