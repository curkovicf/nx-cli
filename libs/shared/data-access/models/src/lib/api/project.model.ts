import {ProjectType} from './project-type.enum';
import {AngularModule} from './angular-module.model';
import {ProjectFolder} from './folder-tree.model';

export interface Project {
  name: string;
  path: string;
  relativePath: string;
  nameInNxJson: string;
  tags: string[];
  folderTree: ProjectFolder;
  angularModules: AngularModule[];
  type: ProjectType | undefined;
}
