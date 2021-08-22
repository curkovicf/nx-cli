import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAppFormComponent } from './new-app-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, DefaultButtonModule],
  declarations: [NewAppFormComponent],
})
export class NewAppFormModule {}
