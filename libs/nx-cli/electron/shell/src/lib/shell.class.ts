import { app, ipcMain } from 'electron';

import { IpcEvents } from '@dev-workspace/nx-cli/shared/data-events';
import { ProjectsEventHandler } from '@dev-workspace/nx-cli/electron/util-event-handlers';

export class Shell {
  static listenEvents(): void {
    // Handle App termination
    ipcMain.on('quit', (event, code) => {
      app.exit(code);
    });

    //  Get all libs & apps
    ipcMain.on(IpcEvents.projects.fromAngular, (event, nxProjectPath) => {
      const projectsHandler = new ProjectsEventHandler(nxProjectPath);
      event.returnValue = projectsHandler.findProjects(nxProjectPath);
    });
  }
}
