import { Component, Input, EventEmitter, Output } from '@angular/core';
import { NxWorkspace } from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'dev-workspace-chips-bar',
  templateUrl: './chips-bar.component.html',
  styleUrls: ['./chips-bar.component.scss'],
})
export class ChipsBarComponent {
  @Input()
  // @ts-ignore
  nxProjects: NxWorkspace[] | null;

  @Input()
  nxSelectedProject: NxWorkspace | null | undefined;

  @Output()
  onaddproject: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onselectproject: EventEmitter<NxWorkspace> = new EventEmitter<NxWorkspace>();
}
