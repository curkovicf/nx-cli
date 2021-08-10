import { app, ipcMain } from 'electron';

import { IpcEvents } from '@dev-workspace/nx-cli/shared/data-events';
import { Project, ProjectType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

export class Shell {
  static listenEvents(): void {
    // Handle App termination
    ipcMain.on('quit', (event, code) => {
      app.exit(code);
    });

    ipcMain.on(IpcEvents.projects.fromAngular, (event, args) => {
      //  Handle events
      console.log('DO SOMETHING');

      const projects: Project[] = [
        {
          name: 'feature-home',
          type: ProjectType.app,
        }
      ];

      event.returnValue = projects;
      //  return result if needed
    });
  }
}
