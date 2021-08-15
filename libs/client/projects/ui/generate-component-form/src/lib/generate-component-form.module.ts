import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateComponentFormComponent } from './generate-component-form.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, DefaultButtonModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    GenerateComponentFormComponent
  ],
})
export class GenerateComponentFormModule {}
