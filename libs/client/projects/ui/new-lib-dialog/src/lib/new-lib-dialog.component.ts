import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';

@Component({
  selector: 'nx-cli-new-lib-form',
  templateUrl: './new-lib-dialog.component.html',
  styleUrls: ['./new-lib-dialog.component.scss']
})
export class NewLibDialogComponent extends NxCliDialogFormClass<NewLibDialogComponent> implements OnInit {
  form: FormGroup;
  options = ['app.module.ts', 'projects.module.ts'];

  constructor(public dialogRef: MatDialogRef<NewLibDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      directory: new FormControl(''),
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
    if (this.isFormValid()) {
      alert('ITS VALID DUDE')
    } else {
      alert('NOP, SORRY ITS NOT VALID')
    }
    console.log(this.form);
    // console.log('SUBMIT LIB ', input);
    // this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }
}
