import { spawnPromise } from './spawn-promise.function';

export async function executeCommand(cmd: string, args: string[], pwd: string, successKeyword: string): Promise<boolean> {
  let isSuccess: boolean;

  try {
    isSuccess = (await spawnPromise(cmd, args, pwd)).includes(successKeyword);
  } catch (err) {
    isSuccess = false;
  }

  return isSuccess;
}
