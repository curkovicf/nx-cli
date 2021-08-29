import { IpcResponse, IpcResponseData } from '@nx-cli/app/shared/util';
import { Project } from '@nx-cli/client/projects/data-access';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';

export interface IProjectsService {
  getAllProjects(workspacePath: string): Promise<IpcResponseData<Project[]>>;
  moveProject(dto: IpcEventDtos.MoveProjectDto): Promise<IpcResponse>;
  createProject(dto: IpcEventDtos.CreateProjectDto): Promise<IpcResponse>;
  deleteProject(dto: IpcEventDtos.DeleteProjectDto): Promise<IpcResponse>;
  generateComponent(dto: IpcEventDtos.GenerateAngularComponent): Promise<IpcResponse>;
  generateService(dto: IpcEventDtos.GenerateAngularService): Promise<IpcResponse>;
  renameProject(dto: IpcEventDtos.RenameProjectDto): Promise<IpcResponse>;
  generateLibrary(dto: IpcEventDtos.GenerateAngularLibrary): Promise<IpcResponse>;
  generateApplication(dto: IpcEventDtos.GenerateAngularApplication): Promise<IpcResponse>;
}
