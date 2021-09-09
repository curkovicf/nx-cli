import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: ProjectsStore,
    public workspacesFacade: WorkspacesFacade,
  ) {}
}
