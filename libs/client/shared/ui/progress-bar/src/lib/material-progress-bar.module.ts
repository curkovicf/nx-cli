import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialProgressBarComponent } from './ui/material-progress-bar.component';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, UiMaterialModule],
  declarations: [MaterialProgressBarComponent],
  exports: [MaterialProgressBarComponent],
})
export class MaterialProgressBarModule {}
