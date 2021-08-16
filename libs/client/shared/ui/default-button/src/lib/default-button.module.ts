import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './default-button.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [
    DefaultButtonComponent
  ],
  exports: [
    DefaultButtonComponent
  ]
})
export class DefaultButtonModule {}
