import { Component, Input } from '@angular/core';
import { Project } from '@nx-cli/client/home/projects/data-access';

@Component({
  selector: 'dev-workspace-project-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input()
  project: Project | undefined;
}
