import * as fs from 'fs-extra';

import { ProjectsRepository } from '@nx-cli/app/projects/repository';
import { NodeUtils, OsUtils } from '@nx-cli/app/shared/util';
import { IProjectsService } from './projects-service.interface';
import { IpcResponses, Project, ProjectsIpcDtos, ProjectType } from '@nx-cli/shared/data-access/models';
import Platform = OsUtils.Platform;
import RemoveTag = ProjectsIpcDtos.RemoveTag;
import { StringUtils } from '@nx-cli/shared/util';

export class ProjectsService implements IProjectsService {
  constructor(private projectsRepository: ProjectsRepository = new ProjectsRepository()) {}

  /**
   * Gets all libs and apps for a specific nx workspace
   * @param workspacePath root workspace path
   */
  async getAllProjects(workspacePath: string): Promise<IpcResponses.ResponseWithData<Project[]>> {
    const projects = await this.projectsRepository.getAllProjectsV2(workspacePath, workspacePath);

    const angularJsonExists = await fs
      .pathExists(`${workspacePath}${OsUtils.getPlatformPathSeparator()}angular.json`)
      .catch(() => false);

    await this.projectsRepository.getProjectsNames(
      workspacePath,
      angularJsonExists ? 'angular.json' : 'workspace.json',
      projects
    );

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
    const dir = StringUtils.removeSpecialCharFrontBack(
      OsUtils.parsePath(
        newDirectory
          .replace('/libs/', '')
          .replace('\\libs\\', '')
          .replace('/apps/', '')
          .replace('\\apps\\', '')
      )
    );
    const cmd = OsUtils.parsePath(
      `nx g @nrwl/workspace:move --project ${project} ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(newName)}`
    );
    const cmdTest = OsUtils.parsePath(`nx g mv --project ${project}-e2e ${dir}${newName}-e2e`);
    const logs: string[] = [];

    const e2eResult = await NodeUtils.executeCommand(cmdTest, [], workspacePath, 'CREATE');
    const result = await NodeUtils.executeCommand(cmd, [], workspacePath, 'CREATE');

    logs.push(e2eResult?.log ?? '');
    logs.push(result?.log ?? '');

    if (OsUtils.getOs() === OsUtils.Platform.windows) {
      await this.projectsRepository.cleanEmptyDirWinFunction(
        `${workspacePath}${OsUtils.getPlatformPathSeparator()}libs`
      );
      await this.projectsRepository.cleanEmptyDirWinFunction(
        `${workspacePath}${OsUtils.getPlatformPathSeparator()}apps`
      );
    }

    return {
      result: {
        workspacePath,
        targetName: newName,
        success: result?.isSuccess
          ? `${oldDirectory}/${oldName} successfully moved to ${newDirectory}/${newName}.`
          : '',
        error: !result?.isSuccess ? `${oldName} has not been successfully moved/renamed.` : '',
      },
      logResponse: {
        workspacePath,
        logs,
      },
    };
  }


  /**
   *
   * @param dto
   */
  async deleteProject(dto: ProjectsIpcDtos.DeleteProjectDto): Promise<IpcResponses.ResponseWithLogs> {
    const { projectNameInNxJson, workspacePath, type } = dto;
    const logs: string[] = [];
    const cmd = OsUtils.parsePath(`nx g @nrwl/workspace:remove --project ${projectNameInNxJson}`);

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
        error: !result?.isSuccess ? `${projectNameInNxJson} has not been successfully deleted. If you are trying to delete app, make sure nothing depends on it.` : '',
      },
      logResponse: {
        workspacePath,
        logs,
      },
    };
  }

  /**
   *
   * @param workspacePath
   */
  async startDepGraph(workspacePath: string): Promise<IpcResponses.Response> {
    const unixCmd = 'nx dep-graph';
    const winCmd = 'start cmd.exe /K nx dep-graph';

    const result = await NodeUtils.executeCommand(
      OsUtils.getOs() === Platform.unix ? unixCmd : winCmd,
      [],
      workspacePath,
      'Dep graph started'
    );

    return {
      workspacePath,
      success: result ? `Dep graph successfully started.` : '',
      error: !result ? `Dep graph has not successfully started.` : '',
    };
  }

  async removeTag(dto: ProjectsIpcDtos.RemoveTag): Promise<IpcResponses.ResponseWithData<RemoveTag>> {
    const result = await this.projectsRepository.removeTag(dto);
    return {
      success: result ? 'Tag successfully removed' : '',
      data: dto,
    };
  }

  async addTag(dto: ProjectsIpcDtos.Tag): Promise<IpcResponses.ResponseWithData<ProjectsIpcDtos.AddTagResult>> {
    const result = await this.projectsRepository.addTag(dto);
    return {
      success: result ? 'Tag successfully created' : '',
      data: {
        tags: result,
        workspacePath: dto.workspacePath,
        selectedProjectName: dto.selectedProjectName,
      },
    };
  }

  async generateArtifact(dto: ProjectsIpcDtos.GenerateArtifact): Promise<IpcResponses.ResponseWithLogs> {
    const result = await this.projectsRepository.generateNxArtifact(dto);

    return {
      result: {
        workspacePath: dto.workspacePath,
        targetName: dto.nxGenerator.name,
        success: result ? `${dto.nxGenerator.name} successfully executed.` : '',
        error: !result ? `${dto.nxGenerator.name} has not been successfully executed.` : '',
      },
      logResponse: {
        workspacePath: dto.workspacePath,
        logs: [result?.log],
      },
    };
  }
}
