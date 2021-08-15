import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateComponentFormComponent } from './generate-component-form.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { ReactiveFormsModule } from '@angular/forms';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, DefaultButtonModule, ReactiveFormsModule, UiMaterialModule],
  declarations: [
    GenerateComponentFormComponent
  ],
})
export class GenerateComponentFormModule {}
