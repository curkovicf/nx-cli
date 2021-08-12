import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
})
export class ProjectDetailComponent {
  constructor(public projectsStore: ProjectsStore) {}
}
