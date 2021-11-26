import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './button.component';
import {MaterialModule} from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class ButtonModule {}
