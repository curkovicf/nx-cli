import { Injectable } from '@angular/core';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { Observable, of } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { Workspace } from '../models/workspace.model';
import { tap } from 'rxjs/operators';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { WorkspacesIpcEvents } from '../ipc/workspaces-ipc-events.namespace';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade
  ) {}

  public validatePath(workspacePath: string): Observable<IpcResponseData<Workspace>> {
    this.progressBarFacade.markOperationAsActive();
    return of(this.electronService.ipcRenderer.sendSync(WorkspacesIpcEvents.validateWorkspacePath.fromAngular, workspacePath))
      .pipe(tap(() => this.progressBarFacade.markOperationAsComplete()));
  }
}
