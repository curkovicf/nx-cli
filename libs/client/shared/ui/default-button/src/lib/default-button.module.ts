import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './default-button.component';
import { MatRippleModule } from '@angular/material/core';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MatRippleModule, MaterialModule],
  declarations: [
    DefaultButtonComponent
  ],
  exports: [
    DefaultButtonComponent
  ]
})
export class DefaultButtonModule {}
