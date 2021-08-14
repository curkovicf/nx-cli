import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { Observable, of } from 'rxjs';
import { Project } from '@nx-cli/client/projects/data-access/store';

@Injectable({
  providedIn: 'root',
})
export class EventsProxyService {
  constructor(private electronService: ElectronService) {
    this.initChannels();
  }

  private initChannels(): void {
    //  Apply operation
    this.electronService.ipcRenderer.on(
      IpcEvents.applyOperation.fromNode,
      (event, operationDto: IpcEventDtos.Operation) => {
        /* TODO: Get stuff */
        // const { projectId, projectPath } = operationDto;
        // this.getInstalledPackagesForProject({projectId, projectPath});
      }
    );
  }

  applyOperation(operationDto: any): void {
    this.electronService.ipcRenderer.send(
      IpcEvents.applyOperation.fromAngular,
      operationDto
    );
  }

  getAllProjects(projectPath?: string): Observable<Project[]> {
    return of(
      this.electronService.ipcRenderer.sendSync(
        IpcEvents.projects.fromAngular,
        projectPath
      )
    );
  }
}
