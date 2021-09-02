import { IController, IpcResponse, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { IAppGlobalsService } from '../services/app-globals.interface';
import { AppGlobalsService } from '../services/app-globals.service';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { ipcMain } from 'electron';


export class AppGlobalsController implements IController {
  private appGlobalsService: IAppGlobalsService = new AppGlobalsService();

  public initRoutes(): void {
    this.initInstallNxOnUserMachine();
    this.initCheckIsNxInstalledOnUserMachine();

    console.warn('\n********** Init App Globals Controller');
  }

  private initInstallNxOnUserMachine(): void {
    ipcMain.on(IpcEvents.installNxOnUserMachineChannel.fromAngular, async (event) => {
      const response: IpcResponseWithLogs = await this.appGlobalsService.installNxOnUserMachine();
      event.sender.send(IpcEvents.defaultChannel.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initCheckIsNxInstalledOnUserMachine(): void {
    ipcMain.on(IpcEvents.checkIsNxInstalledOnUserMachineChannel.fromAngular, async (event) => {
      const response: IpcResponse = await this.appGlobalsService.checkIsNxInstalledOnUserMachine();
      event.sender.send(IpcEvents.checkIsNxInstalledOnUserMachineChannel.fromElectron, response);
    });
  }
}