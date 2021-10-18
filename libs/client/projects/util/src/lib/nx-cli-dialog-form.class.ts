import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class NxCliDialogFormClass<T> {
  public form: FormGroup;

  protected constructor(
    public dialogRef: MatDialogRef<T>
  ) {}

  public onCancel(): void {
    this.dialogRef.close(false);
  }

  public isFormValid(): boolean {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }
}
