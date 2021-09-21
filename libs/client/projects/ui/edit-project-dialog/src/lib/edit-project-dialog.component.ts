import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';


@Component({
  selector: 'nx-cli-move-project-form',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.scss'],
})
export class EditProjectDialogComponent extends NxCliDialogFormClass<EditProjectDialogComponent> implements OnInit {
  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currName: string; currDirectory: string; },
  ) {
    super(dialogRef);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      newName: new FormControl('', [Validators.required]),
      newDirectory: new FormControl(''),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) { return; }

    this.dialogRef.close(this.generateDto());
  }

  private generateDto(): Partial<ProjectsIpcDtos.EditProject> {
    return {
      newName: this.form.get('newName').value,
      newDirectory: this.form.get('newDirectory').value,
      oldName: this.data.currName,
      oldDirectory: this.data.currDirectory
    };
  }
}
