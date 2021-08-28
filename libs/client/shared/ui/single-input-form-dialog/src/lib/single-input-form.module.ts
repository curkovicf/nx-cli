import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SingleInputFormComponent } from './single-input-form.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ButtonModule],
  declarations: [SingleInputFormComponent],
  exports: [SingleInputFormComponent],
})
export class SingleInputFormModule {}
