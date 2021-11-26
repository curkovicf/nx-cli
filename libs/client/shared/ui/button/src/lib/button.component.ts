import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'nx-cli-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  buttonText: string | undefined;

  @Input()
  buttonType: 'warn' | 'primary' | undefined;

  @Input()
  type: 'submit' | 'reset' | 'button' | undefined;

  @Input()
  isDisabled: boolean = false;

  @Output()
  onbtnclick: EventEmitter<void> = new EventEmitter<void>();
}
