import { app, ipcMain } from 'electron';

import { IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { ProjectsEventHandler } from '@nx-cli/app/shell/feature/event-handlers';

export class Shell {
  static listenEvents(): void {
    // Handle App termination
    ipcMain.on('quit', (event, code) => {
      app.exit(code);
    });

    //  Get all libs & apps
    ipcMain.on(IpcEvents.projects.fromAngular, (event, nxProjectPath) => {
      const projectsHandler = new ProjectsEventHandler(nxProjectPath);

      projectsHandler.findProjects(nxProjectPath);
      projectsHandler.getNameOfAllProjectsWithinNxJsonFile();

      event.returnValue = projectsHandler.projects;
    });
  }
}
