import * as fs from 'fs-extra';

import { OsUtils, StringUtils, NodeUtils } from '@nx-cli/app/shared/util';
import { IProjectsService } from './projects-service.interface';
import { ProjectsRepository } from '../repositories/projects.repository';
import { Project, ProjectsIpcDtos, ProjectType, IpcResponses } from '@nx-cli/shared/data-access/models';


export class ProjectsService implements IProjectsService {
  constructor(private projectsRepository: ProjectsRepository = new ProjectsRepository()) {}

  /**
   * Gets all libs and apps for a specific nx workspace
   * @param workspacePath root workspace path
   */
  async getAllProjects(workspacePath: string): Promise<IpcResponses.ResponseWithData<Project[]>> {
    const projects = this.projectsRepository.getAllProjects(workspacePath, workspacePath);

    const angularJsonExists = await fs.pathExists(`${workspacePath}${OsUtils.getPlatformPathSeparator()}angular.json`).catch(() => false);

    await this.projectsRepository.getProjectsNames(workspacePath, angularJsonExists ? 'angular.json' : 'workspace.json', projects);

    await this.projectsRepository.getTagsOfAllProjectsWithinNxJsonFile(workspacePath, projects);

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
  async editProject(dto: ProjectsIpcDtos.EditProject): Promise<IpcResponses.ResponseWithLogs> {
    const { oldName, newName, newDirectory, oldDirectory, workspacePath, project } = dto;
    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(
      newDirectory
        .replace('/libs/', '')
        .replace('\\libs\\', '')
        .replace('/apps/', '')
        .replace('\\apps\\', '')
    ));
    const cmd = OsUtils.parsePath(`nx g mv --project ${project} ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(newName)}`);
    const cmdTest = OsUtils.parsePath(`nx g mv --project ${project}-e2e ${dir}${newName}-e2e`);
    const logs: string[] = [];

    const e2eResult = await NodeUtils.executeCommand(cmdTest, [], workspacePath, 'CREATE');
    const result = await NodeUtils.executeCommand(cmd, [], workspacePath, 'CREATE');

    logs.push(e2eResult?.log ?? '');
    logs.push(result?.log ?? '');

    if (OsUtils.getOs() === OsUtils.Platform.windows) {
      await this.projectsRepository.cleanEmptyDirWinFunction(`${workspacePath}${OsUtils.getPlatformPathSeparator()}libs`);
      await this.projectsRepository.cleanEmptyDirWinFunction(`${workspacePath}${OsUtils.getPlatformPathSeparator()}apps`);
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
  async createProject(dto: ProjectsIpcDtos.CreateProjectDto): Promise<IpcResponses.ResponseWithLogs> {
    const { workspacePath, path, type } = dto;
    const logs: string[] = [];
    const cmd = OsUtils.parsePath(`nx g ${type === 'app' ? 'app' : 'lib'} ${path}`);

    const result = await NodeUtils.executeCommand(cmd, [], workspacePath, 'CREATE');

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
  async deleteProject(dto: ProjectsIpcDtos.DeleteProjectDto): Promise<IpcResponses.ResponseWithLogs> {
    const { projectNameInNxJson, workspacePath, type } = dto;
    const logs: string[] = [];
    const cmd = OsUtils.parsePath(`nx g rm --project ${projectNameInNxJson}`);

    if (type === ProjectType.app) {
      const cmdTest = OsUtils.parsePath(`nx g rm --project ${projectNameInNxJson}-e2e`);
      const e2eResult = await NodeUtils.executeCommand(cmdTest, [], workspacePath, 'DELETE');

      logs.push(e2eResult?.log ?? '');
    }

    const result = await NodeUtils.executeCommand(cmd, [], workspacePath, 'DELETE');

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
  async generateComponent(dto: ProjectsIpcDtos.GenerateAngularComponent): Promise<IpcResponses.ResponseWithLogs> {
    const { name, project, directory, workspacePath } = dto;
    const logs: string[] = [];
    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
    const cmd = OsUtils.parsePath(`nx g c ${dir ? dir + '/' : ''}${name} --project ${StringUtils.removeSpecialCharacters(project)}`);
    const args: string[] = [
      `--flat ${dto.flat}`,
      `--skipTests ${dto.skipTests}`,
      `--export ${dto.export}`,
    ];

    const result = await NodeUtils.executeCommand(cmd, args, workspacePath, 'CREATE');

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
  async generateService(dto: ProjectsIpcDtos.GenerateAngularService): Promise<IpcResponses.ResponseWithLogs> {
    const { name, project, directory, workspacePath } = dto;
    const logs: string[] = [];
    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
    const cmd = OsUtils.parsePath(`nx g s ${dir ? dir + '/' : ''}${name} --project ${StringUtils.removeSpecialCharacters(project)}`);
    const args: string[] = [
      `--flat ${dto.flat}`,
      `--skipTests ${dto.skipTests}`,
    ];

    const result = await NodeUtils.executeCommand(cmd, args, workspacePath, 'CREATE');

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

  async generateLibrary(dto: ProjectsIpcDtos.GenerateAngularLibrary): Promise<IpcResponses.ResponseWithLogs> {
    const { workspacePath, directory, name } = dto;
    const logs: string[] = [];
    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
    const cmd = OsUtils.parsePath(`nx g lib ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(name)}`);
    const args = [
      `--simpleModuleName ${dto.simpleModuleName}`,
      `--publishable ${dto.publishable}`,
      `--buildable ${dto.buildable}`,
      `--addModuleSpecFile ${dto.addModuleSpecFile}`,
      `--enableIvy ${dto.enableIvy}`,
      dto.tags ? `--tags ${StringUtils.removeConsecutiveCommas(dto.tags)}` : '',
      dto.prefix ? `--prefix ${dto.prefix}` : '',
      dto.importPath ? `--importPath ${dto.importPath}` : ''
    ];

    console.log('ARGS ', args);

    const result = await NodeUtils.executeCommand(cmd, args, workspacePath, 'CREATE');

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
  async generateApplication(dto: ProjectsIpcDtos.GenerateAngularApplication): Promise<IpcResponses.ResponseWithLogs> {
    const { workspacePath, directory, name } = dto;
    const logs: string[] = [];
    const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
    const cmd = OsUtils.parsePath(`nx g app ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(name)}`);
    const args = [
      `--routing ${dto.routing}`,
      dto.backendProject ? `--backendProject ${OsUtils.parsePath(dto.backendProject)}` : '',
      dto.prefix ? `--prefix ${dto.prefix}` : '',
      dto.host ? `--host ${dto.host}` : '',
      dto.port ? `--port ${dto.port}` : '',
      dto.tags ? `--tags ${StringUtils.removeConsecutiveCommas(dto.tags)}` : ''
    ];

    const result = await NodeUtils.executeCommand(cmd, args, workspacePath, 'CREATE');

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
