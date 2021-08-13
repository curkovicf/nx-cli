import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'nx-cli-default-button',
  templateUrl: './default-button.component.html',
  styleUrls: ['./default-button.component.scss']
})
export class DefaultButtonComponent {
  @Input()
  buttonText: string | undefined;

  @Input()
  type: 'warn' | 'primary' | undefined;

  @Input()
  isDisabled: boolean = false;

  @Output()
  onbtnclick: EventEmitter<void> = new EventEmitter<void>();
}
