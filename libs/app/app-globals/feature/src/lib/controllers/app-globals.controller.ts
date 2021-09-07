import { IController, IpcResponse, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { IAppGlobalsService } from '../services/app-globals.interface';
import { AppGlobalsService } from '../services/app-globals.service';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { ipcMain } from 'electron';


export class AppGlobalsController implements IController {
  private appGlobalsService: IAppGlobalsService = new AppGlobalsService();

  public initRoutes(): void {
    this.initAttemptToFixIssues();
    this.initHasIssues();

    console.warn('\n********** Init App Globals Controller');
  }

  private initAttemptToFixIssues(): void {
    ipcMain.on(IpcEvents.fixIssues.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponseWithLogs = await this.appGlobalsService.attemptToFixIssues(workspacePath);
      event.sender.send(IpcEvents.fixIssues.fromElectron, response.result);
      event.sender.send(IpcEvents.loggingChannel.fromElectron, response.logResponse);
    });
  }

  private initHasIssues(): void {
    ipcMain.on(IpcEvents.checkIfIssues.fromAngular, async (event, workspacePath: string) => {
      const response: IpcResponse = await this.appGlobalsService.checkIfThereAreIssues(workspacePath);
      event.sender.send(IpcEvents.checkIfIssues.fromElectron, response);
    });
  }
}
