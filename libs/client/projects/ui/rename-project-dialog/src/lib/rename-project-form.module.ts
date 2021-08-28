import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenameProjectFormComponent } from './rename-project-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { SingleInputFormModule } from '@nx-cli/client/shared/ui/single-input-form-dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, ButtonModule, SingleInputFormModule],
  declarations: [RenameProjectFormComponent],
})
export class RenameProjectFormModule {}
