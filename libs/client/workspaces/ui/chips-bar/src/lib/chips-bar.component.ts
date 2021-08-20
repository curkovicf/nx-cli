import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NxProject } from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'dev-workspace-chips-bar',
  templateUrl: './chips-bar.component.html',
  styleUrls: ['./chips-bar.component.scss'],
})
export class ChipsBarComponent {
  @Input()
  // @ts-ignore
  nxProjects: NxProject[] | null;

  @Input()
  nxSelectedProject: NxProject | null | undefined;

  @Output()
  onaddproject: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onselectproject: EventEmitter<NxProject> = new EventEmitter<NxProject>();
}
