import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Workspace } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-chips-bar',
  templateUrl: './chips-bar.component.html',
  styleUrls: ['./chips-bar.component.scss'],
})
export class ChipsBarComponent {
  @Input()
  // @ts-ignore
  workspaces: Workspace[] | null;

  @Input()
  selectedWorkspace: Workspace | null | undefined;

  @Output()
  onaddworkspace: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  onselectworkspace: EventEmitter<Workspace> = new EventEmitter<Workspace>();
}
