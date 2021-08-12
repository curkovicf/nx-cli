import { getInstalledPackages } from './get-installed-packages.function';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

export function getInstalledPackagesForMany(
  paths: string[]
): IpcEventDtos.Package[][] {
  const installedPackages: IpcEventDtos.Package[][] = [];

  paths.forEach((path) => {
    try {
      installedPackages.push(getInstalledPackages(path));
    } catch (error) {
      console.warn(`Couldn't get packages for current project. ${error.stack}`);
    }
  });

  return installedPackages;
}
