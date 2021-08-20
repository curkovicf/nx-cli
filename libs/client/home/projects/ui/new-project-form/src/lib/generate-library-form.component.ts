import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'nx-cli-single-input-with-flags-form',
  templateUrl: './generate-library-form.component.html',
  styleUrls: ['./generate-library-form.component.scss'],
})
export class GenerateLibraryFormComponent {
  public form: FormGroup;
  public flags: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<GenerateLibraryFormComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
    });

    this.flags = this.formBuilder.group({
      buildable: false,
      publishable: false,
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
    const { buildable, publishable } = this.flags.value;
    const stringFlags = [];

    if (buildable) {
      stringFlags.push('--buildable');
    }

    if (publishable) {
      stringFlags.push('--publishable');
    }

    return stringFlags;
  }
}
