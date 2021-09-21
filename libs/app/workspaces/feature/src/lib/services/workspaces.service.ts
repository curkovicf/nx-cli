import { IWorkspaceService } from './workspace-service.interface';
import { WorkspacesRepository } from '../repositories/workspaces.repository';
import { Workspace, IpcResponses } from '@nx-cli/shared/data-access/models';

export class WorkspacesService implements IWorkspaceService {
  constructor(private workspacesRepository = new WorkspacesRepository()) {}
  /**
   *
   * @param workspacePath
   */
  async validateWorkspacePath(workspacePath: string): Promise<IpcResponses.ResponseWithData<Workspace>> {
    if (await this.workspacesRepository.isPathNxWorkspace(workspacePath)) {
      const packageJson = await this.workspacesRepository.getWorkspaceName(workspacePath);
      return {
        data: { path: workspacePath, name: packageJson.name, consoleLogs: [] },
      };
    }

    return {
      data: undefined,
    };
  }
}
