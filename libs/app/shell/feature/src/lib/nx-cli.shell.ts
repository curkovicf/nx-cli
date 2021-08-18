import { WorkspacesController } from '@nx-cli/app/home/workspaces/feature';
import { ProjectsController } from '@nx-cli/app/home/projects/feature';
import { IController } from '@nx-cli/app/shared/util';

export class NxCliShell {
  private workspaceController: IController = new WorkspacesController();
  private projectsController: IController =  new ProjectsController();

  initialize(): void {
    this.workspaceController.initRoutes();
    this.projectsController.initRoutes();
  }
}
