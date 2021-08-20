import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenerateServiceFormComponent } from './generate-service-form.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, DefaultButtonModule],
  declarations: [GenerateServiceFormComponent],
  exports: [GenerateServiceFormComponent],
})
export class GenerateServiceFormModule {}
