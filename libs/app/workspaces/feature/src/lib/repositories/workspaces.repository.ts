import * as fs from 'fs-extra';

import { OsUtils } from '@nx-cli/app/shared/util';
import * as fsExtra from 'fs-extra';

export class WorkspacesRepository {
  async isPathNxWorkspace(pwd: string): Promise<boolean> {
    return await fs.pathExists(`${pwd}${OsUtils.getPlatformPathSeparator()}nx.json`);
  }

  async getWorkspaceName(pwd: string): Promise<any> {
    return await fs.readJSON(`${pwd}${OsUtils.getPlatformPathSeparator()}package.json`);
  }

  async getAllTags(workspacePath: string): Promise<string[]> {
    const tags: string[] = [];
    const pathToNxJson = `${workspacePath}${OsUtils.getPlatformPathSeparator()}nx.json`;
    const nxJson = await fsExtra.readJSON(pathToNxJson);

    console.log(nxJson);

    Object.entries(nxJson.projects).forEach(([key, value]) => tags.push(...(value as { tags: string[] }).tags));

    return tags;
  }
}
