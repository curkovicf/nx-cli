/**
 * This module is responsible on handling all the inter process communications
 * between the frontend to the electron backend.
 */

import { ipcMain } from 'electron';

export default class ElectronEvents {
  static bootstrapElectronEvents(): Electron.IpcMain {
    return ipcMain;
  }
}

