import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SingleInputConfig } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { UtilString } from '@nx-cli/shared/util';

@Component({
  selector: 'nx-cli-move-project-form',
  template: `
    <nx-cli-single-input-form
      [config]="config"
      (oncancel)="dialogRef.close()"
      (onsubmit)="onSubmit($event)">
    </nx-cli-single-input-form>
  `,
  styleUrls: ['./move-project-dialog.component.scss'],
})
export class MoveProjectDialogComponent {
  config: SingleInputConfig;

  constructor(public dialogRef: MatDialogRef<MoveProjectDialogComponent>) {
    this.config = {
      title: 'Enter new location',
      submitButtonText: 'Submit',
      placeholderText: 'Eg. shared/ui',
      inputRequired: true,
    };
  }

  public onSubmit(input: string): void {
    this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }

}
