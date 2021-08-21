import { spawnPromise } from './spawn-promise.function';

export async function executeCommand(
  cmd: string,
  args: string[],
  pwd: string,
  successKeyword: string
): Promise<boolean> {
  try {
    return (await spawnPromise(cmd, args, pwd)).includes(successKeyword);
  } catch (err) {
    return false;
  }
}
