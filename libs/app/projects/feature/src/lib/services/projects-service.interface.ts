import { IpcResponseData, IpcResponseWithLogs } from '@nx-cli/app/shared/util';
import { Project, ProjectsIpcDtos } from '@nx-cli/client/projects/data-access';

export interface IProjectsService {
  getAllProjects(workspacePath: string): Promise<IpcResponseData<Project[]>>;
  editProject(dto: ProjectsIpcDtos.EditProject): Promise<IpcResponseWithLogs>;
  createProject(dto: ProjectsIpcDtos.CreateProjectDto): Promise<IpcResponseWithLogs>;
  deleteProject(dto: ProjectsIpcDtos.DeleteProjectDto): Promise<IpcResponseWithLogs>;
  generateComponent(dto: ProjectsIpcDtos.GenerateAngularComponent): Promise<IpcResponseWithLogs>;
  generateService(dto: ProjectsIpcDtos.GenerateAngularService): Promise<IpcResponseWithLogs>;
  generateLibrary(dto: ProjectsIpcDtos.GenerateAngularLibrary): Promise<IpcResponseWithLogs>;
  generateApplication(dto: ProjectsIpcDtos.GenerateAngularApplication): Promise<IpcResponseWithLogs>;
}
