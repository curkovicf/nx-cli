import { NxLibraryType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

export interface NxLibrary {
  name: string;
  path: string;
  type: NxLibraryType | undefined;
}
