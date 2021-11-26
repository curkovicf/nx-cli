import {Component, OnInit} from '@angular/core';
import {NxCliDialogFormClass} from '@nx-cli/client/projects/util';
import {MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'nx-cli-new-tag-dialog',
  templateUrl: './new-tag-dialog.component.html',
  styleUrls: ['./new-tag-dialog.component.scss'],
})
export class NewTagDialogComponent
  extends NxCliDialogFormClass<NewTagDialogComponent>
  implements OnInit
{
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<NewTagDialogComponent>) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      tagName: new FormControl('', [Validators.required]),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.form.get('tagName').value);
  }
}
