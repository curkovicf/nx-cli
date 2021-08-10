import { IpcEventDtos } from '@dev-workspace/nx-cli/shared/data-events';
import TaskAction = IpcEventDtos.TaskAction;
import Operation = IpcEventDtos.Operation;
import { spawnPromise } from '../factories/process.function';

export async function applyOperations(
  operationDto: Operation
): Promise<string> {
  for await (const operation of operationDto.tasks) {
    let args;

    switch (operation.taskAction) {
      case TaskAction.INSTALL:
        args = ['install', operation.packageName];
        break;
      case TaskAction.INSTALL_SAVE_DEV:
        args = ['install', operation.packageName, '-D'];
        break;
      case TaskAction.REMOVE:
        args = ['uninstall', operation.packageName];
        break;
    }

    await spawnPromise('npm', args, operationDto.projectPath);
  }

  return operationDto.projectId;
}
