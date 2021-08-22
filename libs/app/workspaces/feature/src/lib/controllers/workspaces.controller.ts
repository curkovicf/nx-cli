import { ipcMain } from 'electron';

import { IController } from '@nx-cli/app/shared/util';
import { WorkspacesService } from '../services/workspaces.service';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IWorkspaceService } from '../services/workspace-service.interface';

export class WorkspacesController implements IController {
  private workspacesService: IWorkspaceService = new WorkspacesService();

  initRoutes(): void {
    this.initValidateWorkspacePath();

    console.warn('\n********** Init Workspaces Controller');
  }

  private initValidateWorkspacePath(): void {
    ipcMain.on(IpcEvents.validateWorkspacePath.fromAngular, async (event, workspacePath: string) => {
      event.returnValue = await this.workspacesService.validateWorkspacePath(workspacePath);
    });
  }
}
