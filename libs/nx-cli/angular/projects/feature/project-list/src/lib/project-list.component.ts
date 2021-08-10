import { Component } from '@angular/core';

import { ProjectsStore } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

@Component({
  selector: 'dev-workspace-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  constructor(public projectsStore: ProjectsStore) {}

  onClick() {
    this.projectsStore.getAllProjects();
  }
}
