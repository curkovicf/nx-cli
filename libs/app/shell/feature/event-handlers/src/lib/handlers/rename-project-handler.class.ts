import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import RenameProjectDto = IpcEventDtos.RenameProjectDto;
import { Processes } from '@nx-cli/app/shell/feature/event-handlers';

// @ts-ignore
import cp from 'child_process';

export class RenameProjectHandlerClass {
  public async renameProject(renameProjectDto: RenameProjectDto): Promise<boolean> {
    const { projectNameInNxJson, nxProjectRootPath, newName, libPath} = renameProjectDto;
    const cmd = `nx g mv --project ${projectNameInNxJson} ${libPath}${newName}`;

    let isSuccess: boolean;

    try {
      const cmdTest = `nx g mv --project ${projectNameInNxJson}-e2e ${libPath}${newName}-e2e`;
      cp.execSync(cmdTest, { cwd: nxProjectRootPath });
    } catch (err) {
      console.log(`No e2e project for ${projectNameInNxJson}`);
    }

    try {
      isSuccess = (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
