import { FileType, fileTypes, FolderType, folderTypes, ProjectFile, ProjectFolder } from '@nx-cli/app/projects/feature';
import { getPlatformPathSeparator } from '@nx-cli/app/shared/util';

// @ts-ignore
import * as fs from 'fs';
import * as path from 'path';

export function getProjectFolderTree(pwd: string): ProjectFolder {
  const name = pwd.split(getPlatformPathSeparator()).pop();
  let folderType;

  for (const type of folderTypes) {
    if (type.includes(name)) {
      folderType = type;
      break;
    }
  }

  const projectTree: ProjectFolder = {
    name,
    folderContent: [],
    type: folderType ?? FolderType.unknown
  };

  const files = fs.readdirSync(pwd);

  files.forEach((file: string) => {
    //  Check if its folder, and if it is call recursively
    const absolutePath = path.join(pwd, file);
    const isDir = fs.statSync(absolutePath).isDirectory();

    if (isDir) {
      projectTree.folderContent.push(getProjectFolderTree(absolutePath));
    } else {
      let fileType;

      for (const type of fileTypes) {
        if (file.includes(type)) {
          fileType = type;
          break;
        }
      }

      //  If its file push to content
      projectTree.folderContent.push({
        name: file,
        type: fileType ?? FileType.unknown
      } as ProjectFile);
    }
  });

  return projectTree;
}
