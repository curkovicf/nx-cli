import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nx-cli-generate-service-form',
  templateUrl: './generate-service-form.component.html',
  styleUrls: ['./generate-service-form.component.scss']
})
export class GenerateServiceFormComponent {
  public form: FormGroup;
  public flags: FormGroup;

  constructor(public dialogRef: MatDialogRef<GenerateServiceFormComponent>, private formBuilder: FormBuilder) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required])
    });

    this.flags = this.formBuilder.group({
      flat: false,
      exportComponent: false,
      skipTests: false
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
      flags: this.convertFlagsToStrings()
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
