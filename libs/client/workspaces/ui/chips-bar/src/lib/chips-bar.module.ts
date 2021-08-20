import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsBarComponent } from './chips-bar.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ChipsBarComponent],
  exports: [ChipsBarComponent],
})
export class ChipsBarModule {}
