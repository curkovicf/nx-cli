import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { Processes } from '@nx-cli/app/shell/feature/event-handlers';

export class GenerateServiceHandler {
  public async generateService(generateComponentDto: IpcEventDtos.GenerateDto): Promise<boolean> {
    const { artifactName, flags, parentProjectNameInNxJson, nxProjectRootPath } = generateComponentDto;
    const cmd = `nx g s ${artifactName} --project ${parentProjectNameInNxJson}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, flags, nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
