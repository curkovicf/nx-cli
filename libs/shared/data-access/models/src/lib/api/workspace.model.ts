import { NxGenerator } from './nx-generator.model';

export interface Workspace {
  name: string;
  path: string;
  tags: string[];
  consoleLogs: string[];
  generators: NxGenerator[]
}
