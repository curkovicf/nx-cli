import * as fs from 'fs';
import { NxProject } from '@nx-cli/client/projects/data-access/store';

export class NxProjectEventHandler {
  public isNxProject(path: string): NxProject | undefined {
    let nxProject: NxProject | undefined;

    try {
      const isNxProject = fs.readdirSync(path).includes('nx.json');

      if (isNxProject) {
        const packageJson = JSON.parse(fs.readFileSync(`${path}/package.json`, 'utf-8'));

        nxProject = {
          name: packageJson.name,
          path: path
        }
      }

    } catch (Error) {
      nxProject = undefined;
    }

    return nxProject;
  }
}

