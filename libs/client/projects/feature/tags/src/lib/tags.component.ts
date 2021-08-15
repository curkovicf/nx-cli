import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-actions',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  constructor(public projectsStore: ProjectsStore) {}
}
