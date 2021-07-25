// @ts-ignore
import { ChildProcess, spawn } from 'child_process';


export function spawnPromise(command: string, args: string[], path: string): Promise<any> {
  // *** Return the promise
  return new Promise((resolve, reject) => {
    const process: ChildProcess = spawn(command, args, {
      shell: true,
      detached: true,
      cwd: path
    });

    let std_out = '';
    // const { spawn } = require('child_process');
    // var child = spawn(command, args);
    //
    // child.stdout.pipe(process.stdout);
    // child.stderr.pipe(process.stderr);
    // process.stdin.pipe(child.stdin);
    //
    // child.on('exit', () => process.exit())

    if (!process.stdin) {
      throw new Error('Unable to open stream, stdin');
    }
    if (!process.stdout) {
      throw new Error('Unable to open stream, stdout');
    }

    process.stdin.on('pipe', (d) => {
      console.log('Pipe data ', d);
    });

    process.stdout.on('data', (data) => {
      console.log(data.toString());
      if (data.toString() === 'Username for \'https://github.com\':\n') {

        process.stdin?.write('something\n');
        //    childProcess.stdin.end();
        //    Call this to end the session
      }
      std_out += data.toString();
    });

    process.on('close', (code) => { // Should probably be 'exit', not 'close'
      // *** Process completed
      resolve(std_out);
    });

    process.on('error', (err) => {
      // *** Process creation failed
      reject(err);
    });
  });
}
