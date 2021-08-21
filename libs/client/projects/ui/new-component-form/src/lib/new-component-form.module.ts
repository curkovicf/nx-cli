import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewComponentFormComponent } from './new-component-form.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule, DefaultButtonModule, FormsModule],
  declarations: [NewComponentFormComponent],
})
export class NewComponentFormModule {}
