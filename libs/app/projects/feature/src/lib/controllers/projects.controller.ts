import { ipcMain } from 'electron';

import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data-access/models';
import { ProjectsService } from '../services/projects.service';
import { Project } from '@nx-cli/client/projects/data-access';
import { IController, IpcResponseData, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { IProjectsService } from '../services/projects-service.interface';

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
    ipcMain.on(IpcEvents.getAllProjects.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponseData<Project[]> = await this.projectsService.getAllProjects(workspacePath);
      event.sender.send(IpcEvents.getAllProjects.fromElectron, response);
    });
  }

  private initCreateProject(): void {
    ipcMain.on(IpcEvents.createApp.fromAngular, async (event, dto: IpcEventDtos.CreateProjectDto) => {
      const response: IpcResponseWithLogs = await this.projectsService.createProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initDeleteProject(): void {
    ipcMain.on(IpcEvents.deleteProject.fromAngular, async (event, dto: IpcEventDtos.DeleteProjectDto) => {
      const response: IpcResponseWithLogs = await this.projectsService.deleteProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateComponent(): void {
    ipcMain.on(IpcEvents.createComponent.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularComponent) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateComponent(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateService(): void {
    ipcMain.on(IpcEvents.createService.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularService) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateService(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initEditProject(): void {
    ipcMain.on(IpcEvents.editProject.fromAngular, async (event, dto: IpcEventDtos.EditProject) => {
      const response: IpcResponseWithLogs = await this.projectsService.editProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateLibrary(): void {
    ipcMain.on(IpcEvents.generateLibrary.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularLibrary) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateLibrary(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initGenerateApplication(): void {
    ipcMain.on(IpcEvents.generateApplication.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularApplication) => {
      const response: IpcResponseWithLogs = await this.projectsService.generateApplication(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }
}
