import { Injectable, NgZone } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { IpcResponse } from '@nx-cli/app/shared/util';
import { AppGlobalsFacade } from '@nx-cli/client/shell/data-access';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalsIpcEventsListenerService {
  constructor(
    private electronService: ElectronService,
    private snackBar: MatSnackBar,
    private ngZone: NgZone,
    public appGlobalsFacade: AppGlobalsFacade,
  ) {}

  public initChannels(): void {
    this.initCheckIsNxInstalledChannel();
  }

  private initCheckIsNxInstalledChannel() {
    this.electronService.ipcRenderer.on(IpcEvents.checkIsNxInstalledOnUserMachineChannel.fromElectron, (event, response: IpcResponse) => {
      const { error, success } = response;

      this.ngZone.run(() => {
        this.appGlobalsFacade.setIsNxInstalled(!!success);
        this.snackBar.open(success || error, null);
      });
    });
  }
}
