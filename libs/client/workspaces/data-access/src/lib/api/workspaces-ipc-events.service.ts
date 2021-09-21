import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkspacesFacade } from '../+store/workspaces.facade';
import { WorkspacesIpcEvents, IpcResponses } from '@nx-cli/shared/data-access/models';

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
    this.electronService.ipcRenderer.on(WorkspacesIpcEvents.loggingChannel.fromElectron, (event, response: IpcResponses.LogResponse) => {
      const { workspacePath, logs } = response;

      if (!logs) { return; }

      this.ngZone.run(() => this.workspacesFacade.addLog(workspacePath, logs));
    });
  }
}
