import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditProjectDialogComponent } from './edit-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { SingleInputFormModule } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { InputModule } from '@nx-cli/client/shared/ui/input';
import { CheckboxModule } from '@nx-cli/client/shared/ui/checkbox';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, ButtonModule, SingleInputFormModule, InputModule, CheckboxModule],
  declarations: [EditProjectDialogComponent],
})
export class EditProjectDialogModule {}
