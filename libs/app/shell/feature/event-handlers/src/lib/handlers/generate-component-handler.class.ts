import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { Processes } from '../factories/process.namespace';


export class GenerateComponentHandler {
  public async generateComponent(generateComponentDto: IpcEventDtos.GenerateComponentDto): Promise<boolean> {
    const { componentName, flags, projectNxName, rootPath } = generateComponentDto;
    const cmd = `nx g c ${componentName} --project ${projectNxName}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, flags, rootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
