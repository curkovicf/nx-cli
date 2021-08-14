import { spawnPromise } from '../factories/process.function';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';

export class GenerateComponentHandler {
  public async generateComponent(generateComponentDto: IpcEventDtos.GenerateComponentDto): Promise<boolean> {
    const command = `nx g c `;
    const args = [];

    const spawnedChild = await spawnPromise(command, args, generateComponentDto.projectPath);
    return new Promise(null);
  }
}
