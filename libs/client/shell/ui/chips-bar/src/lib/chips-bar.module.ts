import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsBarComponent } from './chips-bar.component';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, UiMaterialModule],
  declarations: [ChipsBarComponent],
  exports: [
    ChipsBarComponent
  ]
})
export class ChipsBarModule {}
