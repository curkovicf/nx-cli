import { Injectable } from '@angular/core';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { Observable, of } from 'rxjs';
import { IpcEvents } from '@nx-cli/shared/data-access/models';
import { ElectronService } from 'ngx-electron';
import { Workspace } from '../models/workspace.model';
import { tap } from 'rxjs/operators';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade
  ) {}

  public validatePath(workspacePath: string): Observable<IpcResponseData<Workspace>> {
    this.progressBarFacade.addNewActiveAction();
    return of(this.electronService.ipcRenderer.sendSync(IpcEvents.validateWorkspacePath.fromAngular, workspacePath))
      .pipe(tap(() => this.progressBarFacade.removeActiveAction()));
  }
}
