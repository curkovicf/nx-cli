import { ipcMain } from 'electron';
import { IController } from '@nx-cli/app/shared/util';
import { WorkspacesService } from '../services/workspaces.service';
import { IWorkspaceService } from '../services/workspace-service.interface';
import {
  IpcResponses,
  WorkspacesIpcDtos,
  WorkspacesIpcEvents
} from '@nx-cli/shared/data-access/models';

export class WorkspacesController implements IController {
  private workspacesService: IWorkspaceService = new WorkspacesService();

  initRoutes(): void {
    this.initValidateWorkspacePath();
    this.initGetAllTags();
    this.initGetNxGenerators();

    console.warn('\n********** Init Workspaces Controller');
  }

  private initValidateWorkspacePath(): void {
    ipcMain.on(WorkspacesIpcEvents.validateWorkspacePath.fromAngular, async (event, workspacePath: string) => {
      event.returnValue = await this.workspacesService.validateWorkspacePath(workspacePath);
    });
  }

  private initGetAllTags(): void {
    ipcMain.on(WorkspacesIpcEvents.tags.fromAngular, async (event, workspacePath: string) => {
      const response = await this.workspacesService.getAllTags(workspacePath);
      event.sender.send(WorkspacesIpcEvents.tags.fromElectron, response);
    });
  }

  private initGetNxGenerators(): void {
    ipcMain.on(WorkspacesIpcEvents.getAvailableGenerators.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponses.ResponseWithData<WorkspacesIpcDtos.Generators> = await this.workspacesService.getAvailableNxGenerators(workspacePath);
      event.sender.send(WorkspacesIpcEvents.getAvailableGenerators.fromElectron, response);
    })
  }
}
