import { Injectable } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { Observable, of } from 'rxjs';
import { Project } from '@nx-cli/client/projects/data-access/store';

@Injectable({
  providedIn: 'root'
})
export class EventsProxyService {
  constructor(private electronService: ElectronService) {
    this.initChannels();
  }

  private initChannels(): void {
    //  Generate component result
    this.electronService.ipcRenderer.on(IpcEvents.generateComponent.fromNode, (event, isSuccess: boolean) => {
        if (isSuccess) {
          //  TODO: Update-Refresh store
          console.log('SUCESS');
        } else {
          //  TODO: Err toaster
          console.log('ERROR');
        }
      }
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

  public generateComponent(generateComponentDto: IpcEventDtos.GenerateComponentDto): void {
    this.electronService.ipcRenderer.send(IpcEvents.generateComponent.fromAngular, generateComponentDto);
  }
}
