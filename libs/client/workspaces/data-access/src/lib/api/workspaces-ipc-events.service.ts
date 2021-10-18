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
    this.initTagsChannel();
  }

  private initLoggingChannel(): void {
    this.electronService.ipcRenderer.on(WorkspacesIpcEvents.loggingChannel.fromElectron, (event, response: IpcResponses.LogResponse) => {
      const { workspacePath, logs } = response;

      if (!logs) { return; }

      this.ngZone.run(() => this.workspacesFacade.addLog(workspacePath, logs));
    });
  }

  private initTagsChannel(): void {
    this.electronService.ipcRenderer.on(WorkspacesIpcEvents.tags.fromElectron, (event, response: IpcResponses.ResponseWithData<string[]>) => {
      const { success, error, data } = response;

      console.log(data);

      if (error) {
        //  TODO: Impl snackbar
        alert('ERR WITH TAGS');
      }

      this.ngZone.run(() => this.workspacesFacade.addTags(data))
    });
  }
}
