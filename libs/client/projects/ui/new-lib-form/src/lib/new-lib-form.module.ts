import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLibFormComponent } from './new-lib-form.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, DefaultButtonModule],
  declarations: [
    NewLibFormComponent
  ],
})
export class NewLibFormModule {}
