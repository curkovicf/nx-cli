import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { Project } from '@nx-cli/client/projects/data-access/store';

export class ProjectsService {
  async moveProject(dto: IpcEventDtos.MoveProjectDto): Promise<IpcResponse> {
    return null;
  }

  async createProject(dto: IpcEventDtos.CreateProjectDto): Promise<IpcResponse> {
    return null;
  }

  async deleteProject(dto: IpcEventDtos.DeleteProjectDto): Promise<IpcResponse> {
    return null;
  }

  async generateComponent(dto: IpcEventDtos.GenerateDto): Promise<IpcResponse> {
    return null;
  }

  async generateService(dto: IpcEventDtos.GenerateDto): Promise<IpcResponse> {
    return null;
  }

  async renameProject(dto: IpcEventDtos.RenameProjectDto): Promise<IpcResponse> {
    return null;
  }

  async getAllProjects(workspacePath: string): Promise<IpcResponseData<Project[]>> {
    return null;
  }
}
