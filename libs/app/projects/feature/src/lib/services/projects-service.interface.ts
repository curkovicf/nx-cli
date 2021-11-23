import { Project, ProjectsIpcDtos, IpcResponses } from '@nx-cli/shared/data-access/models';


export interface IProjectsService {
  getAllProjects(workspacePath: string): Promise<IpcResponses.ResponseWithData<Project[]>>;
  editProject(dto: ProjectsIpcDtos.EditProject): Promise<IpcResponses.ResponseWithLogs>;
  deleteProject(dto: ProjectsIpcDtos.DeleteProjectDto): Promise<IpcResponses.ResponseWithLogs>;
  startDepGraph(workspacePath: string): Promise<IpcResponses.Response>;
  removeTag(dto: ProjectsIpcDtos.RemoveTag): Promise<IpcResponses.ResponseWithData<ProjectsIpcDtos.RemoveTag>>;
  addTag(dto: ProjectsIpcDtos.Tag): Promise<IpcResponses.ResponseWithData<ProjectsIpcDtos.AddTagResult>>;
  generateArtifact(dto: ProjectsIpcDtos.GenerateArtifact): Promise<IpcResponses.ResponseWithLogs>;
}
