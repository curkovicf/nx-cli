import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nx-cli-generate-component-form',
  templateUrl: './new-component-form.component.html',
  styleUrls: ['./new-component-form.component.scss'],
})
export class NewComponentFormComponent {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewComponentFormComponent>) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      flat: new FormControl(false),
      exportComponent: new FormControl(false),
      skipTests: new FormControl(false)
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

    this.dialogRef.close({
      artifactName: this.form.get('name').value,
      flags: this.convertFlagsToStrings(),
    });
  }

  private convertFlagsToStrings(): string[] {
    const stringFlags = [];
    const { flat, skipTests, exportComponent } = this.form.value;

    if (flat) {
      stringFlags.push('--flat');
    }

    if (skipTests) {
      stringFlags.push('--skipTests');
    }

    if (exportComponent) {
      stringFlags.push('--export');
    }

    return stringFlags;
  }
}
