import { IpcResponseData } from '@nx-cli/app/shared/util';

import * as fs from 'fs-extra';
import { Workspace } from '@nx-cli/client/workspaces/data-access';
import { IWorkspaceService } from './workspace-service.interface';

export class WorkspacesService implements IWorkspaceService {
  /**
   *
   * @param workspacePath
   */
  async validateWorkspacePath(workspacePath: string): Promise<IpcResponseData<Workspace>> {
    const isNxProject = await fs.pathExists(`${workspacePath}/nx.json`);

    if (isNxProject) {
      const packageJson = await fs.readJSON(`${workspacePath}/package.json`);

      return {
        data: { path: workspacePath, name: packageJson.name },
      };
    }

    return {
      data: undefined,
    };
  }
}
