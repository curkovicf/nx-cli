import { ProjectType } from '@nx-cli/client/projects/data-access/store';
import { AngularModule } from './angular-module.model';

export interface Project {
  name: string;
  path: string;
  nameInNxJson: string;
  tags: string[];
  angularModules: AngularModule[];
  type: ProjectType | undefined;
}
