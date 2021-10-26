import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneratorDialogComponent } from './generator-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { CheckboxModule } from '@nx-cli/client/shared/ui/checkbox';
import { InputModule } from '@nx-cli/client/shared/ui/input';
import { DropdownModule } from '@nx-cli/client/shared/ui/dropdown';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    InputModule,
    DropdownModule,
  ],
  declarations: [GeneratorDialogComponent],
})
export class GeneratorDialogModule {}
