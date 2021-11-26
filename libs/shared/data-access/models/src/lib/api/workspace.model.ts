import {NxGenerator} from './nx-generator.model';
import {Project} from './project.model';

export interface Workspace {
  name: string;
  path: string;
  tags: string[];
  selectedProject?: Project;
  consoleLogs: string[];
  generators: NxGenerator[];
}
