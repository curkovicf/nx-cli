import * as path from 'path';
import * as fs from 'fs-extra';

export async function cleanEmptyDirWinFunction(workspacePath: string): Promise<void> {
  const fileStats = await fs.lstat(workspacePath);

  if (!fileStats.isDirectory()) {
    return;
  }

  let fileNames = await fs.readdir(workspacePath);

  if (fileNames.length > 0) {
    const recursiveRemovalPromises = fileNames.map(
      (fileName) => cleanEmptyDirWinFunction(path.join(workspacePath, fileName))
    );
    await Promise.all(recursiveRemovalPromises);

    // re-evaluate fileNames; after deleting subdirectory
    // we may have parent directory empty now
    fileNames = await fs.readdir(workspacePath);
  }

  if (fileNames.length === 0) {
    console.log('Removing: ', workspacePath);
    await fs.rmdir(workspacePath);
  }
}
