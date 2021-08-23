import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SingleInputConfig } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { UtilString } from '@nx-cli/shared/util';

@Component({
  selector: 'nx-cli-new-lib-form',
  template: `
    <nx-cli-single-input-form
      [config]="config"
      (oncancel)="dialogRef.close()"
      (onsubmit)="onSubmit($event)">
    </nx-cli-single-input-form>
  `,
  styleUrls: ['./new-lib-dialog.component.scss'],
})
export class NewLibDialogComponent {
  config: SingleInputConfig;

  constructor(public dialogRef: MatDialogRef<NewLibDialogComponent>) {
    this.config = {
      title: 'Create new lib',
      submitButtonText: 'Submit',
      placeholderText: 'Eg. ui/my-awesome-lib',
      inputRequired: true,
    };
  }

  public onSubmit(input: string): void {
    this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }
}
