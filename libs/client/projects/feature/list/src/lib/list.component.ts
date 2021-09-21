import { ChangeDetectionStrategy, Component } from '@angular/core';
import { listStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'nx-cli-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [listStore]
})
export class ListComponent {
  constructor(
    public listVmStore: listStore,
    public workspacesFacade: WorkspacesFacade,
  ) {
    this.listVmStore.fetchProjects();
  }
}
