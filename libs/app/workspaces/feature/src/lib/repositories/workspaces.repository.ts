import * as fs from 'fs-extra';

import { OsUtils } from '@nx-cli/app/shared/util';

export class WorkspacesRepository {
  async isPathNxWorkspace(pwd: string): Promise<boolean> {
    return await fs.pathExists(`${pwd}${OsUtils.getPlatformPathSeparator()}nx.json`);
  }

  async getWorkspaceName(pwd: string): Promise<any> {
    return await fs.readJSON(`${pwd}${OsUtils.getPlatformPathSeparator()}package.json`);
  }
}
