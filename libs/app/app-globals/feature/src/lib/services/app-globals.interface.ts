import { IpcResponse, IpcResponseWithLogs } from '@nx-cli/app/shared/util';

export interface IAppGlobalsService {
  attemptToFixIssues(workspacePath: string): Promise<IpcResponseWithLogs>;
  checkIfThereAreIssues(workspacePath: string): Promise<IpcResponse>;
}
