import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ProjectsIpcEventsService} from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'nx-cli-projects-layout',
  templateUrl: './projects-layout.component.html',
  styleUrls: ['./projects-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsLayoutComponent {
  constructor(private projectsIpcEventsService: ProjectsIpcEventsService) {}
}
