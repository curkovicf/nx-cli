import { IpcData } from '@dev-workspace/nx-cli/shared/data-ipc';
import Package = IpcData.Package;
import { getInstalledPackages } from './get-installed-packages.function';

export function getInstalledPackagesForMany(paths: string[]): Package[][] {
  const installedPackages: Package[][] = [];

  paths.forEach((path) => {
    try {
      installedPackages.push(getInstalledPackages(path));
    } catch (error) {
      console.warn(`Couldn't get packages for current project. ${error.stack}`);
    }
  });

  return installedPackages;
}
