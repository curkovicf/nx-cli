import {
  IpcResponses,
} from '@nx-cli/shared/data-access/models';
import { Workspace } from 'nx-cli-osfn/lib/workspaces/models/workspace.model';
import { GeneratorsDto } from 'nx-cli-osfn/lib/workspaces/dtos/generators.dto';

export interface IWorkspaceService {
  validateWorkspacePath(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<Workspace>>;
  getAllTags(workspacePath: string): Promise<IpcResponses.ResponseWithData<string[]>>;
  getAvailableNxGenerators(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<GeneratorsDto>>;
}
