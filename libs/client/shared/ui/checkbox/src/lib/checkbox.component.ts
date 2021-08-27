import { Component, EventEmitter, Input, Optional, Output, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

/**
 * Ref
 *
 * https://stackoverflow.com/questions/56979532/angular-reactive-forms-best-way-to-implement-input-components-wrappers
 * https://ritchiejacobs.be/angular-custom-form-component
 *
 */

@Component({
  selector: 'nx-cli-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  initialValue: boolean;

  @Input()
  disabled: boolean;

  @Input()
  title: string;

  @Input()
  description: string;

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

  isChecked = false;


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
    this.isChecked = value;
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
    this.onChange($event.target.checked);
  }
}
