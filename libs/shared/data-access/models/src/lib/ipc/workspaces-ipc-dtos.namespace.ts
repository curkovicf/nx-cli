import { NxGenerator } from '@nx-cli/shared/data-access/models';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace WorkspacesIpcDtos {
  export interface Generators {
    workspacePath: string;
    generators: NxGenerator[];
  }
}
