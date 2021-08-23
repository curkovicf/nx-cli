import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';

@Component({
  selector: 'nx-cli-generate-component-form',
  templateUrl: './new-component-dialog.component.html',
  styleUrls: ['./new-component-dialog.component.scss'],
})
export class NewComponentDialogComponent extends NxCliDialogFormClass<NewComponentDialogComponent> {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewComponentDialogComponent>) {
    super(dialogRef);

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      flat: new FormControl(false),
      exportComponent: new FormControl(false),
      skipTests: new FormControl(false),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close({
      artifactName: this.form.get('name').value,
      flags: this.convertFlagsToStrings(),
    });
  }
}