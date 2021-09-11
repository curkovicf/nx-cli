import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { projectsStore } from '@nx-cli/client/projects/data-access';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponse, LogResponse } from '@nx-cli/app/shared/util';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

@Injectable({
  providedIn: 'root',
})
export class IpcEventsListenerService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private projectsStore: projectsStore,
    public workspacesFacade: WorkspacesFacade,
    private ngZone: NgZone
  ) {}

  public initChannels(): void {
    // this.initGenericResponseChannel();
    this.initLoggingChannel();
  }

  /**
   *
   * @private
   */
  // private initGenericResponseChannel(): void {
  //   this.electronService.ipcRenderer.on(IpcEvents.defaultChannel.fromElectron, (event, response: IpcResponse) => {
  //     const { workspacePath, error, success } = response;
  //
  //     //  FIXME: Rethink this approach
  //     // if (success) { this.projectsIpcApiService.getAllProjects(workspacePath); }
  //
  //     this.ngZone.run(() => this.snackBar.open(success || error, null));
  //   });
  // }

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
