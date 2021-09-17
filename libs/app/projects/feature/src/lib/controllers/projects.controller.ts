import { ipcMain } from 'electron';
import { ProjectsService } from '../services/projects.service';
import { Project, ProjectsIpcDtos, ProjectsIpcEvents } from '@nx-cli/client/projects/data-access';
import { IController, IpcResponseData, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { IProjectsService } from '../services/projects-service.interface';
import { WorkspacesIpcEvents } from '@nx-cli/client/workspaces/data-access';

export class ProjectsController implements IController {
  private projectsService: IProjectsService = new ProjectsService();

  public initRoutes(): void {
    this.initGetAllProjects();
    this.initCreateProject();
    this.initDeleteProject();
    this.initGenerateComponent();
    this.initGenerateService();
    this.initEditProject();
    this.initGenerateLibrary();
    this.initGenerateApplication();

    console.warn('\n********** Init Projects Controller');
  }

  private initGetAllProjects(): void {
    ipcMain.on(ProjectsIpcEvents.getAllProjects.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponseData<Project[]> = await this.projectsService.getAllProjects(workspacePath);
      event.sender.send(ProjectsIpcEvents.getAllProjects.fromElectron, response);
    });
  }

  private initCreateProject(): void {
    ipcMain.on(ProjectsIpcEvents.createApp.fromAngular, async (event, dto: ProjectsIpcDtos.CreateProjectDto) => {
      const response: IpcResponseWithLogs = await this.projectsService.createProject(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initDeleteProject(): void {
    ipcMain.on(ProjectsIpcEvents.deleteProject.fromAngular, async (event, dto: ProjectsIpcDtos.DeleteProjectDto) => {
      const response: IpcResponseWithLogs = await this.projectsService.deleteProject(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateComponent(): void {
    ipcMain.on(ProjectsIpcEvents.createComponent.fromAngular, async (event, dto: ProjectsIpcDtos.GenerateAngularComponent) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateComponent(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateService(): void {
    ipcMain.on(ProjectsIpcEvents.createService.fromAngular, async (event, dto: ProjectsIpcDtos.GenerateAngularService) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateService(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initEditProject(): void {
    ipcMain.on(ProjectsIpcEvents.editProject.fromAngular, async (event, dto: ProjectsIpcDtos.EditProject) => {
      const response: IpcResponseWithLogs = await this.projectsService.editProject(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateLibrary(): void {
    ipcMain.on(ProjectsIpcEvents.generateLibrary.fromAngular, async (event, dto: ProjectsIpcDtos.GenerateAngularLibrary) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateLibrary(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateApplication(): void {
    ipcMain.on(ProjectsIpcEvents.generateApplication.fromAngular, async (event, dto: ProjectsIpcDtos.GenerateAngularApplication) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateApplication(dto);
      event.sender.send(ProjectsIpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(WorkspacesIpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }
}
