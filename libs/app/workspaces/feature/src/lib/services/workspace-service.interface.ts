import { IpcResponseData } from '@nx-cli/app/shared/util';
import { Workspace } from '@nx-cli/client/workspaces/data-access';

export interface IWorkspaceService {
  validateWorkspacePath(workspacePath: string): Promise<IpcResponseData<Workspace>>;
}
