// @ts-ignore
import * as fs from 'fs';

export function isNxProject(path: string): boolean {
  let isNgProject;

  try {
    isNgProject = fs.readdirSync(path).includes('angular.json');
  } catch (Error) {
    isNgProject = false;
  }

  return isNgProject;
}
