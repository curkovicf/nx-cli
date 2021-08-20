// @ts-ignore
import fs from 'fs';

export async function readDirAsync(folder: string) {
  return new Promise((resolve, reject) => {
    try {
      const dirs = fs.readdirSync(folder, 'utf-8');
      resolve(dirs);
    } catch (err) {
      reject(err);
    }
  })
}
