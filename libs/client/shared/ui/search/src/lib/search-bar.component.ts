import { Component, ElementRef, Output, ViewChild, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'dev-workspace-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements AfterViewInit {
  @ViewChild('searchInput') input: ElementRef<HTMLInputElement> | undefined;

  @Output()
  oninput: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onsearch: EventEmitter<any> = new EventEmitter();

  ngAfterViewInit(): void {
    // this.input?.nativeElement.focus();
  }

  public onBlur(searchInput: HTMLInputElement): void {
    setTimeout(() => searchInput.focus(), 10);
  }

  public onInput(value: string): void {
    this.oninput.emit(value);
  }

  public onKeyPress(keyPress: KeyboardEvent): void {
    if (keyPress.code === 'Enter') this.onsearch.emit();
  }
}
