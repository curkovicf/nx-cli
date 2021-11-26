import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialProgressBarComponent} from './material-progress-bar.component';
import {MaterialModule} from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [MaterialProgressBarComponent],
  exports: [MaterialProgressBarComponent],
})
export class MaterialProgressBarModule {}
