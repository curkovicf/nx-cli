import { IpcResponseData } from '@nx-cli/app/shared/util';
import { NxProject } from '@nx-cli/client/projects/data-access/store';

import * as fs from 'fs-extra';

export class WorkspacesService {
  /**
   *
   * @param workspacePath
   */
  async validateWorkspacePath(workspacePath: string): Promise<IpcResponseData<NxProject>> {
    const isNxProject = await fs.pathExists(`${workspacePath}/nx.json`);


    if (isNxProject) {
      const packageJson = await fs.readJSON(`${workspacePath}/package.json`);

      return {
        data: { path: workspacePath, name: packageJson.name }
      }
    }

    return {
      data: undefined
    };
  }
}
