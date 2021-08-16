import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import CreateAppDto = IpcEventDtos.CreateProjectDto;
import { Processes } from '../factories/process.namespace';

export class CreateAppHandler {
  public async createApp(createAppDto: CreateAppDto): Promise<boolean> {
    const { nxProjectRootPath, path} = createAppDto;
    const cmd = `nx g app ${path}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
