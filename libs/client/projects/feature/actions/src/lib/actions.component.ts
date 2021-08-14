import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent {
  constructor(public projectsStore: ProjectsStore) {}
}
