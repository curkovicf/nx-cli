import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponentDialogComponent } from './new-component-dialog.component';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, ButtonModule, FormsModule],
  declarations: [NewComponentDialogComponent],
})
export class NewComponentDialogModule {}
