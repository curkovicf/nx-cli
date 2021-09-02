import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEvents } from '@nx-cli/shared/data-access/models';


@Injectable({
  providedIn: 'root'
})
export class AppGlobalsIpcApiService {
  constructor(private electronService: ElectronService) {}

  public installNxOnUserMachine(): void {
    this.electronService.ipcRenderer.send(IpcEvents.installNxOnUserMachineChannel.fromAngular);
  }
}
