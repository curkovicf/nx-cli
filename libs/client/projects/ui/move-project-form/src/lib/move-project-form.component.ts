import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  SingleInputFormComponentDataResult
} from '@nx-cli/client/shared/ui/single-input-form-dialog';

@Component({
  selector: 'nx-cli-move-project-form',
  templateUrl: './move-project-form.component.html',
  styleUrls: ['./move-project-form.component.scss']
})
export class MoveProjectFormComponent {
  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MoveProjectFormComponent>
  ) {
    this.form = new FormGroup({
      input: new FormControl(null, [Validators.required]),
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
      value: this.getProperFormatOfPath(this.form.get('input').value),
    };

    this.dialogRef.close(data);
  }

  private getProperFormatOfPath(inputString: string): string {
    if (inputString.charAt(inputString.length - 1) === '/') {
      return inputString;
    }

    return `${inputString}/`;
  }
}
