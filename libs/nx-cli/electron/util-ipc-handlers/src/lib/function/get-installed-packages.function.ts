import { IpcData } from '@dev-workspace/nx-cli/shared/data-ipc';
import Package = IpcData.Package;
import { defaultDependenciesConfig } from '../config/default-dependencies.config';

// @ts-ignore
import * as fs from 'fs';

export function getInstalledPackages(path: string): Package[] {
  const packageJson = JSON.parse(fs.readFileSync(path + '/' + 'package.json', 'utf8'));
  const installedPackages: Package[] = [];

  ['dependencies', 'devDependencies'].forEach(jsonProperty => {
    const dependencies = Object.keys(packageJson[jsonProperty]);
    dependencies.forEach(dep => {
      if (!defaultDependenciesConfig.includes(dep)) {
        installedPackages.push({
          name: dep,
          version: packageJson[jsonProperty][dep]
        });
      }
    });
  });

  return installedPackages;
}
