import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';

@Component({
  selector: 'nx-cli-generate-component-form',
  templateUrl: './new-component-dialog.component.html',
  styleUrls: ['./new-component-dialog.component.scss'],
})
export class NewComponentDialogComponent extends NxCliDialogFormClass<NewComponentDialogComponent> implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewComponentDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      directory: new FormControl(''),
      export: new FormControl(false),
      flat: new FormControl(false),
      skipTests: new FormControl(false),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.generateDto());
  }

  private generateDto(): Partial<ProjectsIpcDtos.GenerateAngularComponent> {
    return {
      name: this.form.get('name').value,
      directory: this.form.get('directory').value,
      export: this.form.get('export').value,
      flat: this.form.get('flat').value,
      skipTests: this.form.get('skipTests').value,
    };
  }
}
