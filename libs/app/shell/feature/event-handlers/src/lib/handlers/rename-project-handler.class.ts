import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import RenameProjectDto = IpcEventDtos.RenameProjectDto;
import { Processes } from '@nx-cli/app/shell/feature/event-handlers';

export class RenameProjectHandlerClass {
  public async renameProject(renameProjectDto: RenameProjectDto): Promise<boolean> {
    const { projectNameInNxJson, nxProjectRootPath, newName, libPath} = renameProjectDto;
    const cmd = `nx g mv --project ${projectNameInNxJson} ${libPath}${newName}`;

    let isSuccess: boolean;

    try {
      isSuccess = (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('CREATE');
    } catch (err) {
      isSuccess = false;
    }

    return isSuccess;
  }
}
