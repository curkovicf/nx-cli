import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'nx-cli-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
  @Output()
  onshowerror: EventEmitter<void> = new EventEmitter();
}
