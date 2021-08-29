import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponentDialogComponent } from './new-component-dialog.component';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { InputModule } from '@nx-cli/client/shared/ui/input';
import { CheckboxModule } from '@nx-cli/client/shared/ui/checkbox';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, ButtonModule, FormsModule, InputModule, CheckboxModule],
  declarations: [NewComponentDialogComponent],
})
export class NewComponentDialogModule {}
