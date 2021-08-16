// @ts-ignore
import { ChildProcess, spawn } from 'child_process';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace Processes {
  export function spawnPromise(command: string, args: string[], path: string): Promise<any> {
    // *** Return the promise
    return new Promise((resolve, reject) => {
      const process: ChildProcess = spawn(command, args, {
        shell: true,
        detached: true,
        cwd: path,
      });

      if (!process.stdin) { throw new Error('Unable to open stream, stdin'); }
      if (!process.stdout) { throw new Error('Unable to open stream, stdout'); }

      let std_out = '';

      process.stdin.on('pipe', (data) => console.log('Pipe data ', data));

      process.stdout.on('data', (data) => {
        console.log(data.toString());
        std_out += data.toString();
      });

      process.stdout.on('close', () => resolve(std_out));

      process.stdout.on('exit', () => resolve(std_out));

      process.stderr.on('data', () => resolve(std_out));

      process.on('error', (err) => reject(err));

      process.on('exit', () => resolve(std_out))
    });
  }
}


