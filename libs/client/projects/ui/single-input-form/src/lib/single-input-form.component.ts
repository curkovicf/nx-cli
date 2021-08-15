import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface SingleInputFormComponentData {
  title: string;
  placeholder: string;
  submitButtonText: string;
}

export interface SingleInputFormComponentDataResult {
  value: string;
}

@Component({
  selector: 'nx-cli-single-input-form',
  templateUrl: './single-input-form.component.html',
  styleUrls: ['./single-input-form.component.scss']
})
export class SingleInputFormComponent {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SingleInputFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SingleInputFormComponentData
  ) {
    this.form = new FormGroup({
      input: new FormControl(null, [Validators.required])
    });
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  public onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: SingleInputFormComponentDataResult = {
      value: this.getProperFormatOfPath(this.form.get('input').value)
    }

    this.dialogRef.close(data);
  }

  private getProperFormatOfPath(inputString: string): string {
    if (inputString.charAt(inputString.length - 1) === '/') {
      return inputString;
    }

    return `${inputString}/`
  }
}
