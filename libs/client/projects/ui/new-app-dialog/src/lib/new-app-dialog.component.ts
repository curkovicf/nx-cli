import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IpcEventDtos } from '@nx-cli/shared/data-access/models';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';

@Component({
  selector: 'nx-cli-create-app-form',
  templateUrl: './new-app-dialog.component.html',
  styleUrls: ['./new-app-dialog.component.scss'],
})
export class NewAppDialogComponent extends NxCliDialogFormClass<NewAppDialogComponent> implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewAppDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      directory: new FormControl(''),
      backendProject: new FormControl(''),
      prefix: new FormControl(''),
      tags: new FormControl(''),
      host: new FormControl(''),
      port: new FormControl(''),
      routing: new FormControl(false),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.generateDto());
  }

  private generateDto(): Partial<IpcEventDtos.GenerateApplication> {
    return {
      name: this.form.get('name').value,
      directory: this.form.get('directory').value,
      backendProject: this.form.get('backendProject').value,
      prefix: this.form.get('prefix').value,
      tags: this.form.get('tags').value,
      host: this.form.get('host').value,
      port: this.form.get('port').value,
      routing: this.form.get('routing').value,
    };
  }
}
