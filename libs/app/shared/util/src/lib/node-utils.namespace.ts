// @ts-ignore
import {ChildProcess, spawn, exec} from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace NodeUtils {
  export interface ExecuteCommandResponse {
    isSuccess: boolean;
    log: string;
  }

  export async function executeCommand(
    cmd: string,
    args: string[],
    pwd: string,
    successKeyword: string,
  ): Promise<ExecuteCommandResponse | null> {
    try {
      const result = await spawnPromise(cmd, args, pwd);
      return {
        isSuccess: result.includes(successKeyword),
        log: result.trim(),
      };
    } catch (err) {
      return null;
    }
  }

  export function spawnPromise(
    command: string,
    args: string[],
    path: string,
  ): Promise<string> {
    // *** Return the promise
    return new Promise((resolve, reject) => {
      const process: ChildProcess = spawn(command, args, {
        shell: true,
        detached: false,
        cwd: path,
      });

      if (!process.stdin) {
        throw new Error('Unable to open stream, stdin');
      }
      if (!process.stdout) {
        throw new Error('Unable to open stream, stdout');
      }

      let std_out = '';

      process.stdout.on('data', (data: any) => {
        console.log(data.toString());
        std_out += data.toString();
      });

      process.stdout.on('close', () => resolve(std_out));
      process.stdout.on('exit', () => resolve(std_out));
      process.stderr.on('data', () => resolve(std_out));

      process.on('error', (err: any) => reject(err));
      process.on('exit', () => resolve(std_out));
    });
  }
}
