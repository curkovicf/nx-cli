import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { Observable, of } from 'rxjs';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { Workspace } from '@nx-cli/client/workspaces/data-access';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceIpcApiService {
  constructor(private electronService: ElectronService) {}

  public validatePath(workspacePath: string): Observable<IpcResponseData<Workspace>> {
    return of(this.electronService.ipcRenderer.sendSync(IpcEvents.validateWorkspacePath.fromAngular, workspacePath));
  }
}
