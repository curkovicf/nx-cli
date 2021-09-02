import { IAppGlobalsService } from './app-globals.interface';
import { executeCommand, IpcResponse, IpcResponseWithLogs } from '@nx-cli/app/shared/util';

export class AppGlobalsService implements IAppGlobalsService {
  async installNxOnUserMachine(): Promise<IpcResponseWithLogs> {
    const logs: string[] = [];
    const cmd = 'npm install nx -g';

    const result = await executeCommand(cmd, [], __dirname, 'added 1 package');

    logs.push(result?.log ?? '');

    return {
      result: {
        targetName: 'npm install nx -g',
        workspacePath: __dirname,
        success: result?.isSuccess ? `command: npm install -g successfully executed.` : '',
        error: !result?.isSuccess ? `command: npm install -g has not been successfully executed.` : '',
      },
      logResponse: {
        workspacePath: __dirname,
        logs
      }
    };
  }

  async checkIsNxInstalledOnUserMachine(): Promise<IpcResponse> {
    const cmd = 'npm list -g --depth=0';

    // @nrwl/cli@12.3.6
    // @nrwl/schematics@8.12.11
    const result = await executeCommand(cmd, [], __dirname, '@nrwl/cli');

    return {
      targetName: 'npm install nx -g',
      workspacePath: __dirname,
      success: result?.isSuccess ? `Nx is up and running on your machine. 🚀🚀🚀` : '',
      error: !result?.isSuccess ? `Nx is not installed on machine.` : ''
    };
  }
}
