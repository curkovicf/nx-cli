import { IAppGlobalsService } from './app-globals.interface';
import { IpcResponseWithLogs } from '@nx-cli/app/shared/util';

export class AppGlobalsService implements IAppGlobalsService {
  async installNxOnUserMachine(): Promise<IpcResponseWithLogs> {
    return null;
  }
}
