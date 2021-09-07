import * as fs from 'fs-extra';

import {
  executeCommand,
  getOs,
  getPlatformPathSeparator,
  IpcResponseData,
  parsePath,
  Platform,
  removeSpecialCharFrontBack,
  removeSpecialCharacters,
  IpcResponseWithLogs
} from '@nx-cli/app/shared/util';
import {
  cleanEmptyDirWinFunction,
  getAllProjects,
  getProjectsNames,
  getTagsOfAllProjectsWithinNxJsonFile,
  removeConsecutiveCommas
} from '@nx-cli/app/projects/util';

import { Project, ProjectType } from '@nx-cli/client/projects/data-access';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';
import { IProjectsService } from './projects-service.interface';


export class ProjectsService implements IProjectsService {
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
  async editProject(dto: IpcEventDtos.EditProject): Promise<IpcResponseWithLogs> {
    const { oldName, newName, newDirectory, oldDirectory, workspacePath, project } = dto;
    const dir = removeSpecialCharFrontBack(parsePath(
      newDirectory
        .replace('/libs/', '')
        .replace('\\libs\\', '')
        .replace('/apps/', '')
        .replace('\\apps\\', '')
    ));
    const cmd = parsePath(`nx g mv --project ${project} ${dir ? dir + '/' : ''}${removeSpecialCharacters(newName)}`);
    const cmdTest = parsePath(`nx g mv --project ${project}-e2e ${dir}${newName}-e2e`);
    const logs: string[] = [];

    const e2eResult = await executeCommand(cmdTest, [], workspacePath, 'CREATE');
    const result = await executeCommand(cmd, [], workspacePath, 'CREATE');

    logs.push(e2eResult?.log ?? '');
    logs.push(result?.log ?? '');

    if (getOs() === Platform.windows) {
      await cleanEmptyDirWinFunction(`${workspacePath}${getPlatformPathSeparator()}libs`);
      await cleanEmptyDirWinFunction(`${workspacePath}${getPlatformPathSeparator()}apps`);
    }

    return {
      result: {
        workspacePath,
        targetName: newName,
        success: result?.isSuccess ? `${oldDirectory}/${oldName} successfully moved to ${newDirectory}/${newName}.` : '',
        error: !result?.isSuccess ? `${oldName} has not been successfully moved/renamed.` : ''
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }

  /**
   *
   * @param dto
   */
  async createProject(dto: IpcEventDtos.CreateProjectDto): Promise<IpcResponseWithLogs> {
    const { workspacePath, path, type } = dto;
    const logs: string[] = [];
    const cmd = parsePath(`nx g ${type === 'app' ? 'app' : 'lib'} ${path}`);

    const result = await executeCommand(cmd, [], workspacePath, 'CREATE');

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: path,
        success: result?.isSuccess ? `${path} successfully created.` : '',
        error: !result?.isSuccess ? `${path} has not been successfully created.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    }
  }

  /**
   *
   * @param dto
   */
  async deleteProject(dto: IpcEventDtos.DeleteProjectDto): Promise<IpcResponseWithLogs> {
    const { projectNameInNxJson, workspacePath, type } = dto;
    const logs: string[] = [];
    const cmd = parsePath(`nx g rm --project ${projectNameInNxJson}`);

    if (type === ProjectType.app) {
      const cmdTest = parsePath(`nx g rm --project ${projectNameInNxJson}-e2e`);
      const e2eResult = await executeCommand(cmdTest, [], workspacePath, 'DELETE');

      logs.push(e2eResult?.log ?? '');
    }

    const result = await executeCommand(cmd, [], workspacePath, 'DELETE');

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: projectNameInNxJson,
        success: result?.isSuccess ? `${projectNameInNxJson} successfully deleted.` : '',
        error: !result?.isSuccess ? `${projectNameInNxJson} has not been successfully deleted.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }

  /**
   *
   * @param dto
   */
  async generateComponent(dto: IpcEventDtos.GenerateAngularComponent): Promise<IpcResponseWithLogs> {
    const { name, project, directory, workspacePath } = dto;
    const logs: string[] = [];
    const dir = removeSpecialCharFrontBack(parsePath(directory));
    const cmd = parsePath(`nx g c ${dir ? dir + '/' : ''}${name} --project ${removeSpecialCharacters(project)}`);
    const args: string[] = [
      `--flat ${dto.flat}`,
      `--skipTests ${dto.skipTests}`,
      `--export ${dto.export}`,
    ];

    const result = await executeCommand(cmd, args, workspacePath, 'CREATE');

    console.log("RESUlT ", result);

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: name,
        success: result?.isSuccess ? `${name} component successfully generated.` : '',
        error: !result?.isSuccess ? `${name} component has not been successfully generated.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }

  /**
   *
   * @param dto
   */
  async generateService(dto: IpcEventDtos.GenerateAngularService): Promise<IpcResponseWithLogs> {
    const { name, project, directory, workspacePath } = dto;
    const logs: string[] = [];
    const dir = removeSpecialCharFrontBack(parsePath(directory));
    const cmd = parsePath(`nx g s ${dir ? dir + '/' : ''}${name} --project ${removeSpecialCharacters(project)}`);
    const args: string[] = [
      `--flat ${dto.flat}`,
      `--skipTests ${dto.skipTests}`,
    ];

    const result = await executeCommand(cmd, args, workspacePath, 'CREATE');

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: name,
        success: result ? `${name} service successfully generated.` : '',
        error: !result ? `${name} service has not been successfully generated.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }

  async generateLibrary(dto: IpcEventDtos.GenerateAngularLibrary): Promise<IpcResponseWithLogs> {
    const { workspacePath, directory, name } = dto;
    const logs: string[] = [];
    const dir = removeSpecialCharFrontBack(parsePath(directory));
    const cmd = parsePath(`nx g lib ${dir ? dir + '/' : ''}${removeSpecialCharacters(name)}`);
    const args = [
      `--simpleModuleName ${dto.simpleModuleName}`,
      `--publishable ${dto.publishable}`,
      `--buildable ${dto.buildable}`,
      `--addModuleSpecFile ${dto.addModuleSpecFile}`,
      `--enableIvy ${dto.enableIvy}`,
      dto.tags ? `--tags ${removeConsecutiveCommas(dto.tags)}` : '',
      dto.prefix ? `--prefix ${dto.prefix}` : '',
      dto.importPath ? `--importPath ${dto.importPath}` : ''
    ];

    const result = await executeCommand(cmd, args, workspacePath, 'CREATE');

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: name,
        success: result?.isSuccess ? `${name} library successfully created.` : '',
        error: !result?.isSuccess ? `${name} library has not been successfully created.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }

  /**
   *
   * @param dto
   */
  async generateApplication(dto: IpcEventDtos.GenerateAngularApplication): Promise<IpcResponseWithLogs> {
    const { workspacePath, directory, name } = dto;
    const logs: string[] = [];
    const dir = removeSpecialCharFrontBack(parsePath(directory));
    const cmd = parsePath(`nx g app ${dir ? dir + '/' : ''}${removeSpecialCharacters(name)}`);
    const args = [
      `--routing ${dto.routing}`,
      dto.backendProject ? `--backendProject ${parsePath(dto.backendProject)}` : '',
      dto.prefix ? `--prefix ${dto.prefix}` : '',
      dto.host ? `--host ${dto.host}` : '',
      dto.port ? `--port ${dto.port}` : '',
      dto.tags ? `--tags ${removeConsecutiveCommas(dto.tags)}` : ''
    ];

    const result = await executeCommand(cmd, args, workspacePath, 'CREATE');

    logs.push(result?.log ?? '');

    return {
      result: {
        workspacePath,
        targetName: name,
        success: result ? `${name} application successfully created.` : '',
        error: !result ? `${name} application has not been successfully created.` : '',
      },
      logResponse: {
        workspacePath,
        logs
      }
    };
  }
}
