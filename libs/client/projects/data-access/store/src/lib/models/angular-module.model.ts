import { AngularComponent } from '@nx-cli/client/projects/data-access/store';

export interface AngularModule {
  name: string;
  path: string;
  components: AngularComponent[];
}
