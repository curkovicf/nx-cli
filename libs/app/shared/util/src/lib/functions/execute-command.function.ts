import { spawnPromise } from './spawn-promise.function';

export interface ExecuteCommandResponse {
  isSuccess: boolean;
  log: string;
}

export async function executeCommand(
  cmd: string,
  args: string[],
  pwd: string,
  successKeyword: string
): Promise<ExecuteCommandResponse | null> {
  try {
    const result = await spawnPromise(cmd, args, pwd);
    return {
      isSuccess: result.includes(successKeyword),
      log: result.trim()
    };
  } catch (err) {
    return null;
  }
}
