import { ProjectFolder } from '@nx-cli/app/projects/feature';
// @ts-ignore
import fs from 'fs';

export function getProjectFolderTree(pwd: string): ProjectFolder {
  const files = fs.readdirSync(pwd);
  const projectTree: ProjectFolder = {
    name: '',
    folderContent: [],
    type: 'unknown'
  };

  files.forEach((file: string) => {
    //  Set folder name
    projectTree.name = file;

    //  Set folder type

    //  Check if its folder, and if it is call recursively

    //  If its file push to content
  });

  return projectTree;
}
