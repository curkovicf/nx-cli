import {
  Workspace,
  IpcResponses,
  WorkspacesIpcDtos,
} from '@nx-cli/shared/data-access/models';

export interface IWorkspaceService {
  validateWorkspacePath(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<Workspace>>;
  getAllTags(workspacePath: string): Promise<IpcResponses.ResponseWithData<string[]>>;
  getAvailableNxGenerators(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<WorkspacesIpcDtos.Generators>>;
}
