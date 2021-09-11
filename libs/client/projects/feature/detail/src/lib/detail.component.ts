import { Component } from '@angular/core';
import { projectsStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: projectsStore,
    public workspacesFacade: WorkspacesFacade,
  ) {}
}
