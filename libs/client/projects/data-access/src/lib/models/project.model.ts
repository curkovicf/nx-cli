import { ProjectType } from '@nx-cli/client/projects/data-access';
import { AngularModule } from './angular-module.model';
import { ProjectFolder } from '@nx-cli/app/projects/feature';

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
