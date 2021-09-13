import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { LogResponse } from '@nx-cli/app/shared/util';
import { WorkspacesFacade } from '../+store/workspaces.facade';

@Injectable()
export class WorkspacesIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private workspacesFacade: WorkspacesFacade,
    private ngZone: NgZone
  ) {}

  public initChannels(): void {
    this.initLoggingChannel();
  }

  private initLoggingChannel(): void {
    this.electronService.ipcRenderer.on(IpcEvents.loggingChannel.fromElectron, (event, response: LogResponse) => {
      const { workspacePath, logs } = response;

      if (!logs) {
        return;
      }

      this.ngZone.run(() => this.workspacesFacade.addLog(workspacePath, logs));
    });
  }
}
