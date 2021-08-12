import { NxProjectType } from '@nx-cli/client/projects/data-access/store';

export interface NxProject {
  name: string;
  path: string;
  nameInNxJson: string;
  type: NxProjectType | undefined;
}
