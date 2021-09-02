import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-cli-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  @Input()
  isNxInstalledOnUserMachine: boolean;

  @Output()
  oninstallnx: EventEmitter<void> = new EventEmitter();
}
