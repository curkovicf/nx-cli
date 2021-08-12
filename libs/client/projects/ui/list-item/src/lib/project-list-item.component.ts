import { Component, Input } from '@angular/core';
import { NxProject } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss'],
})
export class ProjectListItemComponent {
  @Input()
  project: NxProject | undefined;
}
