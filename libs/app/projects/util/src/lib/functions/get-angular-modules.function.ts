// @ts-ignore
import * as fs from 'fs';
// import { promises as fs } from 'fs';
// @ts-ignore
import * as path from 'path';

import { AngularModule } from '@nx-cli/client/projects/data-access/store';
import { getClassName } from './get-class-name.function';
import { findDeclaredComponents } from './get-declared-components.function';

export function getAngularModules(projectPath: string): AngularModule[] {
  const angularModules: AngularModule[] = [];
  const files = fs.readdirSync(projectPath); //  Open lib

  //  Recursively look for all angular modules
  files.forEach((file: string) => {
    const absolutePath = path.join(projectPath, file);
    const isFileDirectory = fs.statSync(absolutePath).isDirectory();

    if (isFileDirectory) {
      angularModules.push(...getAngularModules(absolutePath));
    } else if (file.includes('.module.')) {
      //  Angular module is found
      const angularModuleTxt = fs.readFileSync(absolutePath, 'utf8');

      angularModules.push({
        className: getClassName(angularModuleTxt),
        fileName: file,
        path: absolutePath,
        components: findDeclaredComponents(angularModuleTxt),
      });
    }
  });

  return angularModules;
}
