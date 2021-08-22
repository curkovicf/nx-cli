import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RenameProjectFormComponent } from './rename-project-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, DefaultButtonModule],
  declarations: [
    RenameProjectFormComponent
  ],
})
export class RenameProjectFormModule {}
