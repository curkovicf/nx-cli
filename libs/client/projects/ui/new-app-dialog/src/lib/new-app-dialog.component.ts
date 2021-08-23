import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SingleInputConfig } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { UtilString } from '@nx-cli/shared/util';

@Component({
  selector: 'nx-cli-create-app-form',
  template: `
    <nx-cli-single-input-form
      [config]="config"
      (oncancel)="dialogRef.close()"
      (onsubmit)="onSubmit($event)">
    </nx-cli-single-input-form>
  `,
  styleUrls: ['./new-app-dialog.component.scss'],
})
export class NewAppDialogComponent {
  config: SingleInputConfig;

  constructor(public dialogRef: MatDialogRef<NewAppDialogComponent>) {
    this.config = {
      title: 'Add new app',
      submitButtonText: 'Submit',
      placeholderText: 'Eg. my-awesome-app',
      inputRequired: true,
    };
  }

  public onSubmit(input: string): void {
    this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }
}
