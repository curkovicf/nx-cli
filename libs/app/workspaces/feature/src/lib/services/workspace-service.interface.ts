import { Workspace, IpcResponses } from '@nx-cli/shared/data-access/models';


export interface IWorkspaceService {
  validateWorkspacePath(workspacePath: string): Promise<IpcResponses.ResponseWithData<Workspace>>;
}
