import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SingleInputConfig {
  title: string;
  placeholderText: string;
  submitButtonText: string;
  inputRequired: boolean;
}

@Component({
  selector: 'nx-cli-single-input-form',
  template: `
    <h2 mat-dialog-title>{{ config.title }}</h2>

    <form [formGroup]='form' (ngSubmit)='onSubmit()'>
      <div class='input-wrapper'>
        <input formControlName='input'
               name='input'
               type='text'
               [placeholder]='config.placeholderText' />
      </div>

      <div class='actions'>
        <nx-cli-button [buttonText]='config.submitButtonText'
                       buttonType='primary'
                       type='submit'>
        </nx-cli-button>

        <nx-cli-button [buttonText]="'Cancel'"
                       buttonType='warn'
                       (onbtnclick)='oncancel.emit()'>
        </nx-cli-button>
      </div>
    </form>
  `,
  styleUrls: ['./single-input-form.component.scss'],
})
export class SingleInputFormComponent implements OnInit {

  @Input()
  config: SingleInputConfig;

  @Output()
  oncancel: EventEmitter<void> = new EventEmitter();

  @Output()
  onsubmit: EventEmitter<string> = new EventEmitter();

  form: FormGroup;


  ngOnInit(): void {
    this.form = new FormGroup({
      input: new FormControl(null, this.config.inputRequired ? [Validators.required] : []),
    });
  }


  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onsubmit.emit(this.form.get('input').value);
  }
}
