import { NxProjectType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

export interface NxProject {
  name: string;
  path: string;
  nameInNxJson: string;
  type: NxProjectType | undefined;
}
