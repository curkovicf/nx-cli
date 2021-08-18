import { ipcMain } from 'electron';

import { IController } from '@nx-cli/app/shared/util';
import { WorkspacesService } from '../services/workspaces.service';
import { IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { IpcResponse } from '@nx-cli/app/shared/util';

export class WorkspacesController implements IController {
  private workspacesService = new WorkspacesService();

  initRoutes(): void {
    this.initValidateWorkspacePath();

    console.warn('\nInit Workspaces Controller')
  }

  private initValidateWorkspacePath(): void {
    ipcMain.on(IpcEvents.validateWorkspacePath.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponse = await this.workspacesService.validateWorkspacePath(workspacePath);
      event.sender.send(IpcEvents.validateWorkspacePath.fromElectron, response);
    });
  }
}
