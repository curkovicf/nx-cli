import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'nx-cli-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input()
  tags: string[];

  @Output()
  onaddnewtag: EventEmitter<void> = new EventEmitter();

  @Output()
  onremovetag: EventEmitter<string> = new EventEmitter();
}
