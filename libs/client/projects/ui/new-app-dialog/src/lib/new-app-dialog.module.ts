import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewAppDialogComponent } from './new-app-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { SingleInputFormModule } from '@nx-cli/client/shared/ui/single-input-form-dialog';

@NgModule({
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, DefaultButtonModule, SingleInputFormModule],
  declarations: [NewAppDialogComponent],
})
export class NewAppDialogModule {}
