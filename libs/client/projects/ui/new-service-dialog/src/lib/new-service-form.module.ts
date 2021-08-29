import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewServiceFormComponent } from './new-service-form.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { InputModule } from '@nx-cli/client/shared/ui/input';
import { CheckboxModule } from '@nx-cli/client/shared/ui/checkbox';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule, ButtonModule, InputModule, CheckboxModule],
  declarations: [NewServiceFormComponent],
  exports: [NewServiceFormComponent],
})
export class NewServiceFormModule {}
