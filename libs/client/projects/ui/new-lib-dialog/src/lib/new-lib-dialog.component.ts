import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilString } from '@nx-cli/shared/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'nx-cli-new-lib-form',
  templateUrl: './new-lib-dialog.component.html',
  styleUrls: ['./new-lib-dialog.component.scss']
})
export class NewLibDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewLibDialogComponent>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      directory: new FormControl(null, [Validators.required]),
      buildable: new FormControl(null, [Validators.required]),
      enableIvy: new FormControl(null, [Validators.required]),
      prefix: new FormControl(null, [Validators.required]),
      publishable: new FormControl(null, [Validators.required]),
      simpleModuleName: new FormControl(null, [Validators.required])
    });
  }

  public onSubmit(input: string): void {
    console.log('SUBMIT LIB ', input);
    this.dialogRef.close(UtilString.addBackslashAtEndIfNotThere(input));
  }
}
