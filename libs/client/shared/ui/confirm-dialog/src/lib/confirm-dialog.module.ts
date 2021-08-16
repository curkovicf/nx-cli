import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DefaultButtonModule],
  declarations: [
    ConfirmDialogComponent
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule {}
