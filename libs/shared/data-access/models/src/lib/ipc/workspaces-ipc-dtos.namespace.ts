import { NxGenerator } from '../api/nx-generator.model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkspacesIpcDtos {
  export interface Generators {
    workspacePath: string;
    generators: NxGenerator[];
  }
}
