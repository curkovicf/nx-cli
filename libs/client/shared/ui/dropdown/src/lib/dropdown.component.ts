import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'nx-cli-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements ControlValueAccessor {
  @Input()
  options: string[];

  @Input()
  disabled: boolean;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  initialItem: string;

  @Output()
  onchange: EventEmitter<string> = new EventEmitter();

  value = '';


  constructor(
    // Retrieve the dependency only from the local injector,
    // not from parent or ancestors.
    @Self()
    // We want to be able to use the component without a form,
    // so we mark the dependency as optional.
    @Optional()
    private ngControl: NgControl
  ) {
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }


  /**
   * Write form value to the DOM element (model => view)
   */
  writeValue(value: any): void {
    this.value = value;
  }

  /**
   * Write form disabled state to the DOM element (model => view)
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Update form when DOM element value changes (view => model)
   */
  registerOnChange(fn: any): void {
    // Store the provided function as an internal method.
    this.onChange = fn;
  }

  /**
   * Update form when DOM element is blurred (view => model)
   */
  registerOnTouched(fn: any): void {
    // Store the provided function as an internal method.
    this.onTouched = fn;
  }

  public onChange() {}

  public onTouched() {}

  onInputChange($event: Event) {
    // @ts-ignore
    this.onChange($event.target.options[$event.target.options.selectedIndex].value);
    // @ts-ignore
    this.onchange.emit($event.target.options[$event.target.options.selectedIndex].value);
  }
}
