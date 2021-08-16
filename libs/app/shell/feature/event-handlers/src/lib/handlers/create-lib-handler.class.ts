import { Processes } from '@nx-cli/app/shell/feature/event-handlers';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

export class CreateLibHandler {
  public async createLib(createLibDto: IpcEventDtos.CreateProjectDto): Promise<boolean> {
    const { nxProjectRootPath, path, flags } = createLibDto;
    const cmd = `nx g lib ${path}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, flags, nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
