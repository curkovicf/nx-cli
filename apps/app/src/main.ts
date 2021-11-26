import SquirrelEvents from './app/events/squirrel.events';
import ElectronEvents from './app/events/electron.events';

import {app, BrowserWindow} from 'electron';
import App from './app/app';

import {NxCliShell} from '@nx-cli/app/shell/feature';

const nxCliShell = new NxCliShell();

export default class Main {
  static initialize() {
    if (SquirrelEvents.handleEvents()) {
      // squirrel events handled (except first run events) and app will exit in 1000ms, so don't do anything else
      app.quit();
    }
  }

  static bootstrapApp() {
    App.main(app, BrowserWindow);
  }

  static bootstrapAppEvents() {
    ElectronEvents.bootstrapElectronEvents();

    // initialize auto updater services
    if (!App.isDevelopmentMode()) {
      // UpdateEvents.initAutoUpdateService();
    }
  }
}

// handle setup events as quickly as possible
Main.initialize();

// bootstrap app
Main.bootstrapApp();
Main.bootstrapAppEvents();

// bootstrap nx-cli events
nxCliShell.initialize();
