import { IpcResponseWithLogs } from '@nx-cli/app/shared/util';

export interface IAppGlobalsService {
  installNxOnUserMachine(): Promise<IpcResponseWithLogs>;
}
