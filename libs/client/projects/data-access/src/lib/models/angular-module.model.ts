import { AngularComponent } from '@nx-cli/client/projects/data-access';

export interface AngularModule {
  className: string;
  fileName: string;
  path: string;
  components: AngularComponent[];
}
