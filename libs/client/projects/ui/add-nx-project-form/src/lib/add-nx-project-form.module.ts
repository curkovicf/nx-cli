import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNxProjectFormComponent } from './add-nx-project-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, UiMaterialModule],
  declarations: [
    AddNxProjectFormComponent
  ],
  exports: [
    AddNxProjectFormComponent
  ]
})
export class AddNxProjectFormModule {}
