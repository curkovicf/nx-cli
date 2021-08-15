import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { Processes } from '../factories/process.namespace';


export class GenerateComponentHandler {
  public async generateComponent(generateComponentDto: IpcEventDtos.GenerateDto): Promise<boolean> {
    const { artifactName, flags, parentProjectNameInNxJson, nxProjectRootPath } = generateComponentDto;
    const cmd = `nx g c ${artifactName} --project ${parentProjectNameInNxJson}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, flags, nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
