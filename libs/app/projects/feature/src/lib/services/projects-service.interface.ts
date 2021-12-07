import { IpcResponses } from '@nx-cli/shared/data-access/models';
import { DeleteProjectDto } from 'nx-cli-osfn/lib/projects/dtos/delete-project.dto';
import { GenerateArtifactDto } from 'nx-cli-osfn/lib/projects/dtos/generate-artifact.dto';
import { EditProjectDto } from 'nx-cli-osfn/lib/projects/dtos/edit-project.dto';
import { RemoveTagDto } from 'nx-cli-osfn/lib/projects/dtos/remove-tag.dto';
import { AddTagResult } from 'nx-cli-osfn/lib/projects/dtos/add-tag-result.dto';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';
import { TagDto } from 'nx-cli-osfn/lib/projects/dtos/tag.dto';

export interface IProjectsService {
  getAllProjects(
    workspacePath: string
  ): Promise<IpcResponses.ResponseWithData<Project[]>>;

  editProject(dto: EditProjectDto): Promise<IpcResponses.ResponseWithLogs>;

  deleteProject(
    dto: DeleteProjectDto
  ): Promise<IpcResponses.ResponseWithLogs>;

  startDepGraph(workspacePath: string): Promise<IpcResponses.Response>;

  removeTag(
    dto: RemoveTagDto
  ): Promise<IpcResponses.ResponseWithData<RemoveTagDto>>;

  addTag(
    dto: TagDto
  ): Promise<IpcResponses.ResponseWithData<AddTagResult>>;

  generateArtifact(
    dto: GenerateArtifactDto
  ): Promise<IpcResponses.ResponseWithLogs>;
}
