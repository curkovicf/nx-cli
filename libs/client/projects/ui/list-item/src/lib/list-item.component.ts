import { Component, Input } from '@angular/core';
import { NxProject } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input()
  project: NxProject | undefined;
}
