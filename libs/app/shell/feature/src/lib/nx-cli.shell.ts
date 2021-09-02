import { WorkspacesController } from '@nx-cli/app/workspaces/feature';
import { ProjectsController } from '@nx-cli/app/projects/feature';
import { IController } from '@nx-cli/app/shared/util';
import { AppGlobalsController } from '@nx-cli/app/app-globals/feature';

export class NxCliShell {
  private workspaceController: IController = new WorkspacesController();
  private projectsController: IController = new ProjectsController();
  private appGlobalsController: IController = new AppGlobalsController();

  initialize(): void {
    this.workspaceController.initRoutes();
    this.projectsController.initRoutes();
    this.appGlobalsController.initRoutes();
  }
}
