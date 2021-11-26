import {Component, ElementRef, Output, ViewChild, EventEmitter} from '@angular/core';

@Component({
  selector: 'dev-workspace-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @ViewChild('searchInput') input: ElementRef<HTMLInputElement> | undefined;

  @Output()
  oninput: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onsearch: EventEmitter<any> = new EventEmitter();

  public onKeyPress(keyPress: KeyboardEvent): void {
    if (keyPress.code === 'Enter') this.onsearch.emit();
  }
}
