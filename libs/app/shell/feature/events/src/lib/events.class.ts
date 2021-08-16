import { app, ipcMain } from 'electron';

import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import {
  CreateAppHandler, CreateLibHandler,
  DeleteProjectHandler,
  GenerateComponentHandler,
  GenerateServiceHandler,
  MoveProjectHandlerClass,
  NxProjectEventHandler,
  ProjectsEventHandler,
  RenameProjectHandlerClass
} from '@nx-cli/app/shell/feature/event-handlers';
import { ProjectType } from '@nx-cli/client/projects/data-access/store';

export class Events {
  static init(): void {
    // Handle App termination
    ipcMain.on('quit', (event, code) => {
      app.exit(code);
    });

    //  Get all libs & apps
    ipcMain.on(IpcEvents.projects.fromAngular, (event, path) => {
      const projectsHandler = new ProjectsEventHandler(path);

      projectsHandler.findProjects(path);
      projectsHandler.getProjectsFromWorkspaceFile();
      projectsHandler.getProjectsFromAngularJsonFile();
      projectsHandler.getTagsOfAllProjectsWithinNxJsonFile();

      event.sender.send(IpcEvents.projects.fromNode, projectsHandler.projects);
    });

    //  Check if passed path is nx project
    ipcMain.on(IpcEvents.nxProject.fromAngular, (event, path) => {
      const nxProjectHandler = new NxProjectEventHandler();

      event.returnValue = nxProjectHandler.isNxProject(path);
    });

    //  Generate component
    ipcMain.on(IpcEvents.generateComponent.fromAngular, async (event, project: IpcEventDtos.GenerateDto) => {
      const generateComponentHandler = new GenerateComponentHandler();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await generateComponentHandler.generateComponent(project),
        artifactName: project.artifactName,
        rootPath: project.nxProjectRootPath
      };

      event.sender.send(IpcEvents.generateComponent.fromNode, generateResultDto);
    });

    //  Generate service
    ipcMain.on(IpcEvents.generateService.fromAngular, async (event, generateDto: IpcEventDtos.GenerateDto) => {
      const generateServiceHandler = new GenerateServiceHandler();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await generateServiceHandler.generateService(generateDto),
        artifactName: generateDto.artifactName,
        rootPath: generateDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.generateService.fromNode, generateResultDto);
    });

    //  Move project
    ipcMain.on(IpcEvents.moveProject.fromAngular, async (event, generateDto: IpcEventDtos.MoveProjectDto) => {
      const moveProjectHandlerClass = new MoveProjectHandlerClass();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await moveProjectHandlerClass.moveProject(generateDto),
        artifactName: generateDto.projectNameInNxJson,
        rootPath: generateDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.moveProject.fromNode, generateResultDto);
    });

    //  Rename project
    ipcMain.on(IpcEvents.renameProject.fromAngular, async (event, generateDto: IpcEventDtos.RenameProjectDto) => {
      const renameProjectHandlerClass = new RenameProjectHandlerClass();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await renameProjectHandlerClass.renameProject(generateDto),
        artifactName: generateDto.projectNameInNxJson,
        rootPath: generateDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.renameProject.fromNode, generateResultDto);
    });

    //  Delete project
    ipcMain.on(IpcEvents.deleteProject.fromAngular, async (event, deleteProjectDto: IpcEventDtos.DeleteProjectDto) => {
      const deleteProjectHandler = new DeleteProjectHandler();
      const { projectType } = deleteProjectDto;

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: projectType === ProjectType.app ?
          await deleteProjectHandler.deleteAppSync(deleteProjectDto) :
          await deleteProjectHandler.deleteLib(deleteProjectDto),
        artifactName: deleteProjectDto.projectNameInNxJson,
        rootPath: deleteProjectDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.deleteProject.fromNode, generateResultDto);
    });

    //  Create app
    ipcMain.on(IpcEvents.createApp.fromAngular, async (event, createAppDto: IpcEventDtos.CreateProjectDto) => {
      const createAppHandler = new CreateAppHandler();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await createAppHandler.createApp(createAppDto),
        artifactName: createAppDto.path,
        rootPath: createAppDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.createApp.fromNode, generateResultDto);
    });

    //  Create lib
    ipcMain.on(IpcEvents.createLib.fromAngular, async (event, createProjectDto: IpcEventDtos.CreateProjectDto) => {
      const createLibHandler = new CreateLibHandler();

      const generateResultDto: IpcEventDtos.GenerateResultDto = {
        isSuccess: await createLibHandler.createLib(createProjectDto),
        artifactName: createProjectDto.path,
        rootPath: createProjectDto.nxProjectRootPath
      };

      event.sender.send(IpcEvents.createLib.fromNode, generateResultDto);
    });
  }
}
