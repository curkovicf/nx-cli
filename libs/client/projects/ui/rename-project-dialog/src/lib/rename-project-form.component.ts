import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SingleInputConfig } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { UtilString } from '@nx-cli/shared/util';

@Component({
  selector: 'nx-cli-rename-project-form',
  template: `
    <nx-cli-single-input-form
      [config]="config"
      (oncancel)="dialogRef.close()"
      (onsubmit)="onSubmit($event)">
    </nx-cli-single-input-form>
  `,
  styleUrls: ['./rename-project-form.component.scss'],
})
export class RenameProjectFormComponent {
  config: SingleInputConfig;

  constructor(public dialogRef: MatDialogRef<RenameProjectFormComponent>) {
    this.config = {
      title: 'Enter new name',
      submitButtonText: 'Submit',
      placeholderText: 'Eg. my-awesome-new-name',
      inputRequired: true,
    };
  }

  public onSubmit(input: string): void {
    this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }

}
