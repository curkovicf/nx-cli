import {Component, Input} from '@angular/core';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';

@Component({
  selector: 'nx-cli-project-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input()
  project: Project | undefined;
}
