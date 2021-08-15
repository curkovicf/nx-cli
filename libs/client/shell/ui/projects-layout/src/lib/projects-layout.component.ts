import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'dev-workspace-home-layout',
  templateUrl: './projects-layout.component.html',
  styleUrls: ['./projects-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsLayoutComponent {}
