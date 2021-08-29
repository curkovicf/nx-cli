import { ipcMain } from 'electron';

import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data-access/models';
import { ProjectsService } from '../services/projects.service';
import { Project } from '@nx-cli/client/projects/data-access';
import { IController, IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { IProjectsService } from '../services/projects-service.interface';

export class ProjectsController implements IController {
  private projectsService: IProjectsService = new ProjectsService();

  public initRoutes(): void {
    this.initGetAllProjects();
    this.initCreateProject();
    this.initDeleteProject();
    this.initGenerateComponent();
    this.initGenerateService();
    this.initRenameProject();
    this.initMoveProject();
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
      const response: IpcResponse = await this.projectsService.createProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initDeleteProject(): void {
    ipcMain.on(IpcEvents.deleteProject.fromAngular, async (event, dto: IpcEventDtos.DeleteProjectDto) => {
      const response: IpcResponse = await this.projectsService.deleteProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initGenerateComponent(): void {
    ipcMain.on(IpcEvents.createComponent.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularComponent) => {
      const response: IpcResponse = await this.projectsService.generateComponent(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initGenerateService(): void {
    ipcMain.on(IpcEvents.createService.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularService) => {
      const response: IpcResponse = await this.projectsService.generateService(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initRenameProject(): void {
    ipcMain.on(IpcEvents.renameProject.fromAngular, async (event, dto: IpcEventDtos.RenameProjectDto) => {
      const response: IpcResponse = await this.projectsService.renameProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initMoveProject(): void {
    ipcMain.on(IpcEvents.moveProject.fromAngular, async (event, dto: IpcEventDtos.MoveProjectDto) => {
      const response: IpcResponse = await this.projectsService.moveProject(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initGenerateLibrary(): void {
    ipcMain.on(IpcEvents.generateLibrary.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularLibrary) => {
      const response: IpcResponse = await this.projectsService.generateLibrary(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initGenerateApplication(): void {
    ipcMain.on(IpcEvents.generateApplication.fromAngular, async (event, dto: IpcEventDtos.GenerateAngularApplication) => {
      const response: IpcResponse = await this.projectsService.generateApplication(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }
}
