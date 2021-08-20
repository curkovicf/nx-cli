import { AngularComponent } from '@nx-cli/client/home/projects/data-access';

export interface AngularModule {
  className: string;
  fileName: string;
  path: string;
  components: AngularComponent[];
}
