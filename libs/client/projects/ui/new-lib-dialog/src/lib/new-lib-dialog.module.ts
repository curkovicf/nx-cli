import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewLibDialogComponent } from './new-lib-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { SingleInputFormModule } from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { CheckboxModule } from '@nx-cli/client/shared/ui/checkbox';
import { InputModule } from '@nx-cli/client/shared/ui/input';
import { DropdownModule } from '@nx-cli/client/shared/ui/dropdown';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ButtonModule,
    SingleInputFormModule,
    CheckboxModule,
    InputModule,
    DropdownModule
  ],
  declarations: [NewLibDialogComponent],
})
export class NewLibDialogModule {}
