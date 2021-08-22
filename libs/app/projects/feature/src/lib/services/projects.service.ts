import * as fs from 'fs-extra';

import {
  executeCommand,
  getPlatformPathSeparator,
  IpcResponse,
  IpcResponseData,
  parsePath
} from '@nx-cli/app/shared/util';
import {
  getAllProjects,
  getProjectsNames,
  getTagsOfAllProjectsWithinNxJsonFile,
} from '@nx-cli/app/projects/util';
import { Project, ProjectType } from '@nx-cli/client/projects/data-access';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';


export class ProjectsService {
  /**
   * Gets all libs and apps for a specific nx workspace
   * @param workspacePath root workspace path
   */
  async getAllProjects(workspacePath: string): Promise<IpcResponseData<Project[]>> {
    const projects = getAllProjects(workspacePath, workspacePath);

    const angularJsonExists = await fs.pathExists(`${workspacePath}${getPlatformPathSeparator()}angular.json`).catch(() => false);

    await getProjectsNames(workspacePath, angularJsonExists ? 'angular.json' : 'workspace.json', projects);

    await getTagsOfAllProjectsWithinNxJsonFile(workspacePath, projects);

    return {
      data: projects,
      success: projects.length > 0 ? 'Projects successfully fetched.' : '',
      error: projects.length === 0 ? 'There are no projects installed.' : '',
    };
  }

  /**
   *
   * @param dto
   */
  async moveProject(dto: IpcEventDtos.MoveProjectDto): Promise<IpcResponse> {
    const { projectNameInNxJson, moveTo, workspacePath, projectName } = dto;

    const cmd = parsePath(`nx g mv --project ${projectNameInNxJson} ${moveTo}${projectName}`);
    const cmdTest = parsePath(`nx g mv --project ${projectNameInNxJson}-e2e ${moveTo}${projectName}-e2e`);

    await executeCommand(cmdTest, [], workspacePath, 'CREATE');
    const isSuccess = await executeCommand(cmd, [], workspacePath, 'CREATE');

    return {
      workspacePath,
      targetName: projectNameInNxJson,
      success: isSuccess ? `${projectName} successfully moved.` : '',
      error: !isSuccess ? `${projectName} has not been successfully moved.` : '',
    };
  }

  /**
   *
   * @param dto
   */
  async createProject(dto: IpcEventDtos.CreateProjectDto): Promise<IpcResponse> {
    const { workspacePath, path, type } = dto;

    const cmd = parsePath(`nx g ${type === 'app' ? 'app' : 'lib'} ${path}`);

    const isSuccess = await executeCommand(cmd, [], workspacePath, 'CREATE');

    return {
      workspacePath,
      targetName: path,
      success: isSuccess ? `${path} successfully created.` : '',
      error: !isSuccess ? `${path} has not been successfully created.` : '',
    };
  }

  /**
   *
   * @param dto
   */
  async deleteProject(dto: IpcEventDtos.DeleteProjectDto): Promise<IpcResponse> {
    const { projectNameInNxJson, workspacePath, type } = dto;

    const cmd = parsePath(`nx g rm --project ${projectNameInNxJson}`);

    if (type === ProjectType.app) {
      const cmdTest = parsePath(`nx g rm --project ${projectNameInNxJson}-e2e`);
      await executeCommand(cmdTest, [], workspacePath, 'DELETE');
    }

    const isSuccess = await executeCommand(cmd, [], workspacePath, 'DELETE');

    return {
      workspacePath,
      targetName: projectNameInNxJson,
      success: isSuccess ? `${projectNameInNxJson} successfully deleted.` : '',
      error: !isSuccess ? `${projectNameInNxJson} has not been successfully deleted.` : '',
    };
  }

  /**
   *
   * @param dto
   */
  async generateComponent(dto: IpcEventDtos.GenerateDto): Promise<IpcResponse> {
    const { artifactName, flags, projectName, workspacePath } = dto;

    const cmd = parsePath(`nx g c ${artifactName} --project ${projectName}`);

    const isSuccess = await executeCommand(cmd, flags, workspacePath, 'CREATE');

    return {
      workspacePath,
      targetName: artifactName,
      success: isSuccess ? `${artifactName} component successfully generated.` : '',
      error: !isSuccess ? `${artifactName} component has not been successfully generated.` : '',
    };
  }

  /**
   *
   * @param dto
   */
  async generateService(dto: IpcEventDtos.GenerateDto): Promise<IpcResponse> {
    const { artifactName, flags, projectName, workspacePath } = dto;

    const cmd = parsePath(`nx g s ${artifactName} --project ${projectName}`);

    const isSuccess = await executeCommand(cmd, flags, workspacePath, 'CREATE');

    return {
      workspacePath,
      targetName: artifactName,
      success: isSuccess ? `${artifactName} service successfully generated.` : '',
      error: !isSuccess ? `${artifactName} service has not been successfully generated.` : '',
    };
  }

  /**
   *
   * @param dto
   */
  async renameProject(dto: IpcEventDtos.RenameProjectDto): Promise<IpcResponse> {
    const { projectNameInNxJson, workspacePath, newName, libPath, type } = dto;

    const cmd = parsePath(`nx g mv --project ${projectNameInNxJson} ${libPath}${newName}`);

    if (type === ProjectType.app) {
      const cmdTest = `nx g mv --project ${projectNameInNxJson}-e2e ${libPath}${newName}-e2e`;
      await executeCommand(cmdTest, [], workspacePath, 'CREATE');
    }

    const isSuccess = await executeCommand(cmd, [], workspacePath, 'CREATE');

    return {
      workspacePath,
      targetName: projectNameInNxJson,
      success: isSuccess ? `${projectNameInNxJson} successfully renamed.` : '',
      error: !isSuccess ? `${projectNameInNxJson} has not been successfully renamed.` : '',
    };
  }
}
