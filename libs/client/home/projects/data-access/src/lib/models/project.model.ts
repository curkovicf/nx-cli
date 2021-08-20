import { ProjectType } from '@nx-cli/client/home/projects/data-access';
import { AngularModule } from './angular-module.model';

export interface Project {
  name: string;
  path: string;
  relativePath: string;
  nameInNxJson: string;
  tags: string[];
  angularModules: AngularModule[];
  type: ProjectType | undefined;
}
