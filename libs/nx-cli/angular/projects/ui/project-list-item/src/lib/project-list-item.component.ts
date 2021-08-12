import { Component, Input } from '@angular/core';
import { NxProject } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

@Component({
  selector: 'dev-workspace-project-list-item',
  templateUrl: './project-list-item.component.html',
  styleUrls: ['./project-list-item.component.scss']
})
export class ProjectListItemComponent {
  @Input()
  project: NxProject | undefined;
}
