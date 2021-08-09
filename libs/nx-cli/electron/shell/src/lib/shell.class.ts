import { app, ipcMain } from 'electron';

import { IpcEvents } from '@dev-workspace/nx-cli/shared/data-events';

export class Shell {
  static listenEvents(): void {
    // Handle App termination
    ipcMain.on('quit', (event, code) => {
      app.exit(code);
    });

    ipcMain.handle(IpcEvents.installedPackages.fromAngular, () => {
      //  Handle events

      //  return result if needed
    });
  }
}
