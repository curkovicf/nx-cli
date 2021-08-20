import { ipcMain } from 'electron';

import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { ProjectsService } from '../services/projects.service';
import { Project } from '@nx-cli/client/projects/data-access/store';
import { IController, IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';

export class ProjectsController implements IController {
  private projectsService = new ProjectsService();

  public initRoutes(): void {
    this.initGetAllProjects();
    this.initCreateProject();
    this.initDeleteProject();
    this.initGenerateComponent();
    this.initGenerateService();
    this.initRenameProject();
    this.initMoveProject();

    console.warn('\n********** Init Projects Controller')
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
    ipcMain.on(IpcEvents.createComponent.fromAngular, async (event, dto: IpcEventDtos.GenerateDto) => {
      const response: IpcResponse = await this.projectsService.generateComponent(dto);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }

  private initGenerateService(): void {
    ipcMain.on(IpcEvents.createService.fromAngular, async (event, dto: IpcEventDtos.GenerateDto) => {
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
      console.log(response);
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response);
    });
  }
}
