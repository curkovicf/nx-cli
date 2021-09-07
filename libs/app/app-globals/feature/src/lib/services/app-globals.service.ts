import { IAppGlobalsService } from './app-globals.interface';
import {
  executeCommand,
  getPlatformPathSeparator,
  IpcResponse,
  IpcResponseWithLogs
} from '@nx-cli/app/shared/util';
import * as fs from 'fs-extra';

export class AppGlobalsService implements IAppGlobalsService {
  async attemptToFixIssues(workspacePath: string): Promise<IpcResponseWithLogs> {
    const logs: string[] = [];
    const cmdInstallNx = 'npm install -g @nrwl/cli';
    const cmdInstallNodeModules = 'npm i';

    const result = await executeCommand(cmdInstallNx, [], __dirname, 'added');
    const result2 = await executeCommand(cmdInstallNodeModules, [], workspacePath, '');

    const dirExists = await fs.pathExists(`${workspacePath}${getPlatformPathSeparator()}node_modules`);

    logs.push(result?.log ?? '');
    logs.push(result2?.log ?? '');

    return {
      result: {
        targetName: 'ISSUES: ',
        workspacePath: workspacePath,
        success: result?.isSuccess || dirExists ? `Issues for the app should be fixed. :)` : '',
        error: !result?.isSuccess && !dirExists ? `Whoops, something went wrong. Please try to fix issues manually. :(` : '',
      },
      logResponse: {
        workspacePath: workspacePath,
        logs
      }
    };
  }

  async checkIfThereAreIssues(workspacePath: string): Promise<IpcResponse> {
    const cmd = 'npm list -g --depth=0';

    // @nrwl/cli@12.3.6
    // @nrwl/schematics@8.12.11
    const isNxCliInstalled = await executeCommand(cmd, [], __dirname, '@nrwl');
    const dirExists = await fs.pathExists(`${workspacePath}${getPlatformPathSeparator()}node_modules`);

    console.log('DIR EXISTS ', dirExists);
    console.log('IS NX CLI INSTALLED  ', isNxCliInstalled?.isSuccess);

    return {
      targetName: '',
      workspacePath: workspacePath,
      success: isNxCliInstalled?.isSuccess && dirExists ? `Nx is up and running on your machine. 🚀🚀🚀` : '',
      error: !isNxCliInstalled?.isSuccess || !dirExists ? `Nx is not installed on machine.` : ''
    };
  }
}
