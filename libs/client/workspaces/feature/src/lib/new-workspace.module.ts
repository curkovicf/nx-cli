import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewWorkspaceComponent } from './new-workspace.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  declarations: [NewWorkspaceComponent],
  exports: [NewWorkspaceComponent],
})
export class NewWorkspaceModule {}
