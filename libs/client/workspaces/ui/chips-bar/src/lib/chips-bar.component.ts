import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Workspace } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-chips-bar',
  templateUrl: './chips-bar.component.html',
  styleUrls: ['./chips-bar.component.scss'],
})
export class ChipsBarComponent {
  @Input()
  workspaces: Workspace[];

  @Input()
  selectedWorkspace: Workspace | null | undefined;

  @Output()
  onaddworkspace: EventEmitter<void> = new EventEmitter();

  @Output()
  onselectworkspace: EventEmitter<Workspace> = new EventEmitter();

  @Output()
  ondeleteworkspace: EventEmitter<Workspace> = new EventEmitter();

  public onDeleteWorkspace($event: MouseEvent, workspace: Workspace): void {
    $event.stopPropagation();
    this.ondeleteworkspace.emit(workspace);
  }
}
