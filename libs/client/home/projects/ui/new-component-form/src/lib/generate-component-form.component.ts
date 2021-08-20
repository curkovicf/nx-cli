import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nx-cli-generate-component-form',
  templateUrl: './generate-component-form.component.html',
  styleUrls: ['./generate-component-form.component.scss'],
})
export class GenerateComponentFormComponent {
  public form: FormGroup;
  public flags: FormGroup;

  constructor(public dialogRef: MatDialogRef<GenerateComponentFormComponent>, private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });

    this.flags = this.formBuilder.group({
      flat: false,
      exportComponent: false,
      skipTests: false,
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
    const { flat, skipTests, exportComponent } = this.flags.value;

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
