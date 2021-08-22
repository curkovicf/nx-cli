import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

export abstract class NxCliDialogFormClass<T> {
  public form: FormGroup;

  protected constructor(
    public dialogRef: MatDialogRef<T>
  ) {}

  public onCancel(): void {
    this.dialogRef.close();
  }

  public isFormValid(): boolean {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return false;
    }

    return true;
  }

  public convertFlagsToStrings(): string[] {
    const { flat, skipTests, exportComponent } = this.form.value;
    const stringFlags = [];

    if (flat) {
      stringFlags.push('--flat');
    }

    if (skipTests) {
      stringFlags.push('--skipTests');
    }

    if (exportComponent) {
      stringFlags.push('--export');
    }

    return stringFlags;
  }
}
