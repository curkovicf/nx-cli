import {AngularComponent} from './angular-component.model';

export interface AngularModule {
  className: string;
  fileName: string;
  path: string;
  components: AngularComponent[];
}
