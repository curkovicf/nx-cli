import { IpcResponseData } from '@nx-cli/app/shared/util';

import { Workspace } from '@nx-cli/client/workspaces/data-access';
import { IWorkspaceService } from './workspace-service.interface';
import { WorkspacesRepository } from '../repositories/workspaces.repository';

export class WorkspacesService implements IWorkspaceService {
  constructor(private workspacesRepository = new WorkspacesRepository()) {}
  /**
   *
   * @param workspacePath
   */
  async validateWorkspacePath(workspacePath: string): Promise<IpcResponseData<Workspace>> {
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
