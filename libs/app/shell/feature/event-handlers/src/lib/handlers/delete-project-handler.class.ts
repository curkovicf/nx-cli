import { Processes } from '@nx-cli/app/shell/feature/event-handlers';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

// @ts-ignore
import * as cp from 'child_process';

export class DeleteProjectHandler {
  public async deleteApp(deleteProjectDto: IpcEventDtos.DeleteProjectDto): Promise<boolean> {
    const { projectNameInNxJson, nxProjectRootPath } = deleteProjectDto;

    const cmd = `nx g rm --project ${projectNameInNxJson}`;
    const cmdTest = `nx g rm --project ${projectNameInNxJson}-e2e`;

    try {
      const data = await Promise.all([
        await Processes.spawnPromise(cmdTest, [], nxProjectRootPath),
        await Processes.spawnPromise(cmd, [], nxProjectRootPath),
      ]);

      return data[0].includes('DELETE') || data[1].includes('DELETE');
    } catch (err) {
      return false;
    }
  }

  public async deleteAppSync(deleteProjectDto: IpcEventDtos.DeleteProjectDto): Promise<boolean> {
    const { projectNameInNxJson, nxProjectRootPath } = deleteProjectDto;

    const cmd = `nx g rm --project ${projectNameInNxJson}`;
    const cmdTest = `nx g rm --project ${projectNameInNxJson}-e2e`;

    try {
      const data = cp.execSync(cmdTest, { cwd: nxProjectRootPath });
      const data2 = cp.execSync(cmd, { cwd: nxProjectRootPath });

      return data.includes('DELETE') || data2.includes('DELETE');
    } catch (err) {
      return false;
    }
  }

  public async deleteLib(deleteProjectDto: IpcEventDtos.DeleteProjectDto): Promise<boolean> {
    const { projectNameInNxJson, nxProjectRootPath } = deleteProjectDto;

    const cmd = `nx g rm --project ${projectNameInNxJson}`;

    try {
      return (await Processes.spawnPromise(cmd, [], nxProjectRootPath)).includes('DELETE');
    } catch (err) {
      return false;
    }
  }
}
