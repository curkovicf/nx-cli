import { app, ipcMain } from 'electron';

import { IpcEventDtos, IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { NxProjectEventHandler, ProjectsEventHandler, GenerateComponentHandler } from '@nx-cli/app/shell/feature/event-handlers';
import { GenerateServiceHandler } from '../../../event-handlers/src/lib/handlers/generate-service-handler.class';

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

      console.log(generateDto);
      console.log(generateResultDto);

      event.sender.send(IpcEvents.generateService.fromNode, generateResultDto);
    });
  }
}
