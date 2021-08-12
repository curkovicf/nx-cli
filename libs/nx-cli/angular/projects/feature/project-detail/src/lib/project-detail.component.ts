import { Component } from '@angular/core';
import { ProjectsStore } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent {
  constructor(public projectsStore: ProjectsStore) {}
}
