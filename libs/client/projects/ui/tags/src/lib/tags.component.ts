import { Component, Input } from '@angular/core';

@Component({
  selector: 'nx-cli-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class TagsComponent {
  @Input() tags: string[];
}
