import { Processes } from '@nx-cli/app/shell/feature/event-handlers';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

export class CreateLibHandler {
  public async createApp(createLibDto: IpcEventDtos.CreateProjectDto): Promise<boolean> {
    const { nxProjectRootPath, path, tags } = createLibDto;
    const cmd = `nx g lib ${path}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
