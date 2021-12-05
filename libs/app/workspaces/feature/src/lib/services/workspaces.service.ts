import {IWorkspaceService} from './workspace-service.interface';
import {
  IpcResponses,
} from '@nx-cli/shared/data-access/models';
import {WorkspacesRepositoryImpl} from 'nx-cli-osfn/lib/workspaces/repositories/workspaces-repository-impl.class';
import { Workspace } from 'nx-cli-osfn/lib/workspaces/models/workspace.model';
import { GeneratorsDto } from 'nx-cli-osfn/lib/workspaces/dtos/generators.dto';

export class WorkspacesService implements IWorkspaceService {
  constructor(private workspacesRepository = new WorkspacesRepositoryImpl()) {}
  /**
   *
   * @param workspacePath
   */
  async validateWorkspacePath(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<Workspace>> {
    if (await this.workspacesRepository.isPathNxWorkspace(workspacePath)) {
      const packageJson = await this.workspacesRepository.getWorkspaceName(workspacePath);
      return {
        data: {
          path: workspacePath,
          name: packageJson.name,
          consoleLogs: [],
          selectedProject: null,
          tags: (await this.getAllTags(workspacePath)).data,
          generators: (await this.getAvailableNxGenerators(workspacePath)).data
            .generators,
        },
      };
    }

    return {
      data: undefined,
    };
  }

  /**
   *
   * @param workspacePath
   */
  async getAllTags(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<string[]>> {
    const data = await this.workspacesRepository.getAllTags(workspacePath);
    return {
      data,
      workspacePath,
      success: data.length > 0 ? 'Found couple of tags' : '',
    };
  }

  /**
   *
   * @param workspacePath
   */
  async getAvailableNxGenerators(
    workspacePath: string,
  ): Promise<IpcResponses.ResponseWithData<GeneratorsDto>> {
    const result = await this.workspacesRepository.getAvailableNxGenerators(
      workspacePath,
    );
    return {
      success: result ? 'Nx generators successfully analyzed' : '',
      data: {
        generators: result,
        workspacePath,
      },
    };
  }
}
