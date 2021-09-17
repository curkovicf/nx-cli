import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { ProjectsIpcDtos } from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'nx-cli-new-lib-form',
  templateUrl: './new-lib-dialog.component.html',
  styleUrls: ['./new-lib-dialog.component.scss']
})
export class NewLibDialogComponent extends NxCliDialogFormClass<NewLibDialogComponent> implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewLibDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      directory: new FormControl(''),
      importPath: new FormControl(''),
      addModuleSpecFile: new FormControl(false),
      buildable: new FormControl(false),
      enableIvy: new FormControl(false),
      publishable: new FormControl(false),
      simpleModuleName: new FormControl(false),
      prefix: new FormControl(''),
      tags: new FormControl(''),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.generateDto());
  }

  private generateDto(): Partial<ProjectsIpcDtos.GenerateAngularLibrary> {
    return {
      directory: this.form.get('directory').value,
      buildable: this.form.get('buildable').value,
      enableIvy: this.form.get('enableIvy').value,
      importPath: this.form.get('importPath').value,
      tags: this.form.get('tags').value,
      name: this.form.get('name').value,
      prefix: this.form.get('prefix').value,
      publishable: this.form.get('publishable').value,
      simpleModuleName: this.form.get('simpleModuleName').value,
      addModuleSpecFile: this.form.get('addModuleSpecFile').value
    };
  }
}
