import {Component, Input} from '@angular/core';

@Component({
  selector: 'nx-cli-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss'],
})
export class TabItemComponent {
  @Input() title: string;
}
