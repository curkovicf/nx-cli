import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'nx-cli-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements ControlValueAccessor, AfterViewInit {
  @ViewChild('inputElement')
  inputElement: ElementRef;

  // @Input()
  // formControlName: string;

  @Input()
  initialValue: string;

  @Input()
  disabled: boolean;

  @Input()
  title: string;

  @Input()
  description: string;

  @Input()
  inputType: 'text' | 'number' = 'text';

  @Output()
  onchange: EventEmitter<boolean> = new EventEmitter();

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

  ngAfterViewInit(): void {
    if (!this.initialValue) { return; }

    this.inputElement.nativeElement.value = this.initialValue;
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
    this.onChange($event.target.value);
  }
}
