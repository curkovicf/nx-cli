import { AngularComponent } from '@nx-cli/client/projects/data-access/store';

export interface AngularModule {
  className: string;
  fileName: string;
  path: string;
  components: AngularComponent[];
}
