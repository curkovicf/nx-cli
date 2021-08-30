import { IpcResponseData, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { Project } from '@nx-cli/client/projects/data-access';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';

export interface IProjectsService {
  getAllProjects(workspacePath: string): Promise<IpcResponseData<Project[]>>;
  editProject(dto: IpcEventDtos.EditProject): Promise<IpcResponseWithLogs>;
  createProject(dto: IpcEventDtos.CreateProjectDto): Promise<IpcResponseWithLogs>;
  deleteProject(dto: IpcEventDtos.DeleteProjectDto): Promise<IpcResponseWithLogs>;
  generateComponent(dto: IpcEventDtos.GenerateAngularComponent): Promise<IpcResponseWithLogs>;
  generateService(dto: IpcEventDtos.GenerateAngularService): Promise<IpcResponseWithLogs>;
  generateLibrary(dto: IpcEventDtos.GenerateAngularLibrary): Promise<IpcResponseWithLogs>;
  generateApplication(dto: IpcEventDtos.GenerateAngularApplication): Promise<IpcResponseWithLogs>;
}
