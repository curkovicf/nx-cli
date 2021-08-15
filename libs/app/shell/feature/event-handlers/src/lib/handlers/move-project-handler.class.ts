import { Processes } from '@nx-cli/app/shell/feature/event-handlers';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

export class MoveProjectHandlerClass {
  public async moveProject(generateComponentDto: IpcEventDtos.MoveProjectDto): Promise<boolean> {
    const { projectNameInNxJson, moveTo, nxProjectRootPath, projectName } = generateComponentDto;
    const cmd = `nx g mv --project ${projectNameInNxJson}  ${moveTo}${projectName}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
