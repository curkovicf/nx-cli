import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { ProjectsIpcDtos } from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'nx-cli-generate-service-form',
  templateUrl: './new-service-form.component.html',
  styleUrls: ['./new-service-form.component.scss'],
})
export class NewServiceFormComponent extends NxCliDialogFormClass<NewServiceFormComponent> implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewServiceFormComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      directory: new FormControl(''),
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

  private generateDto(): Partial<ProjectsIpcDtos.GenerateAngularService> {
    return {
      name: this.form.get('name').value,
      directory: this.form.get('directory').value,
      flat: this.form.get('flat').value,
      skipTests: this.form.get('skipTests').value,
    };
  }
}
