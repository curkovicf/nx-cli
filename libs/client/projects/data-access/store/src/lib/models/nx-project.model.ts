import { NxProjectType } from '@nx-cli/client/projects/data-access/store';
import { AngularModule } from './angular-module.model';

export interface NxProject {
  name: string;
  path: string;
  nameInNxJson: string;
  tags: string[];
  angularModules: AngularModule[];
  type: NxProjectType | undefined;
}
