import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LogResponse } from '@nx-cli/app/shared/util';
import { WorkspacesFacade } from '../+store/workspaces.facade';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { WorkspacesIpcEvents } from '../ipc/workspaces-ipc-events.namespace';

@Injectable()
export class WorkspacesIpcEventsService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private workspacesFacade: WorkspacesFacade,
    private ngZone: NgZone,
    private progressBarFacade: ProgressBarFacade
  ) {}

  public initChannels(): void {
    this.initLoggingChannel();
  }

  private initLoggingChannel(): void {
    this.electronService.ipcRenderer.on(WorkspacesIpcEvents.loggingChannel.fromElectron, (event, response: LogResponse) => {
      const { workspacePath, logs } = response;

      this.progressBarFacade.markOperationAsComplete();

      if (!logs) {
        return;
      }

      this.ngZone.run(() => this.workspacesFacade.addLog(workspacePath, logs));
    });
  }
}
