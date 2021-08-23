import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nx-cli-generate-service-form',
  templateUrl: './new-service-form.component.html',
  styleUrls: ['./new-service-form.component.scss'],
})
export class NewServiceFormComponent {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewServiceFormComponent>) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      flat: new FormControl(false),
      exportComponent: new FormControl(false),
      skipTests: new FormControl(false),
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
