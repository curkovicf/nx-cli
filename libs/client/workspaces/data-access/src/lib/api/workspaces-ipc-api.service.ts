import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ElectronService } from 'ngx-electron';
import { tap } from 'rxjs/operators';
import { ProgressBarFacade } from '@nx-cli/client/shared/data-access';
import { WorkspacesIpcEvents, Workspace, IpcResponses } from '@nx-cli/shared/data-access/models';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesIpcApiService {
  constructor(
    private electronService: ElectronService,
    private progressBarFacade: ProgressBarFacade
  ) {}

  public validatePath(workspacePath: string): Observable<IpcResponses.ResponseWithData<Workspace>> {
    this.progressBarFacade.markOperationAsActive();
    return of(this.electronService.ipcRenderer.sendSync(WorkspacesIpcEvents.validateWorkspacePath.fromAngular, workspacePath))
      .pipe(tap(() => this.progressBarFacade.markOperationAsComplete()));
  }

  public getTags(workspacePath: string): void {
    this.electronService.ipcRenderer.send(WorkspacesIpcEvents.tags.fromAngular, workspacePath);
  }

  public getAvailableNxGenerators(workspacePath: string): void {
    this.electronService.ipcRenderer.send(WorkspacesIpcEvents.getAvailableGenerators.fromAngular, workspacePath);
  }
}
