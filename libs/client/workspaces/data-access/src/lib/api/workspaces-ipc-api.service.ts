import { Injectable } from '@angular/core';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { Observable, of } from 'rxjs';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { ElectronService } from 'ngx-electron';
import { Workspace } from '../models/workspace.model';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesIpcApiService {
  constructor(private electronService: ElectronService) {}

  public validatePath(workspacePath: string): Observable<IpcResponseData<Workspace>> {
    return of(this.electronService.ipcRenderer.sendSync(IpcEvents.validateWorkspacePath.fromAngular, workspacePath));
  }
}
