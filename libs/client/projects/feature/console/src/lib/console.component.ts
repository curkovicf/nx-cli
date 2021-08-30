import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'nx-cli-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent {
  constructor(
    public projectsStore: ProjectsStore,
    public workspacesFacade: WorkspacesFacade,
  ) {}

  clearConsole() {
    console.log('Clear console');
  }
}
