import { Processes } from '@nx-cli/app/shell/feature/event-handlers';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

// @ts-ignore
import cp from 'child_process';

export class MoveProjectHandlerClass {
  public async moveProject(generateComponentDto: IpcEventDtos.MoveProjectDto): Promise<boolean> {
    const { projectNameInNxJson, moveTo, nxProjectRootPath, projectName } = generateComponentDto;
    const cmd = `nx g mv --project ${projectNameInNxJson}  ${moveTo}${projectName}`;

    let isSuccess: boolean;

    try {
      const cmdTest = `nx g mv --project ${projectNameInNxJson}-e2e ${moveTo}${projectName}-e2e`;
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
