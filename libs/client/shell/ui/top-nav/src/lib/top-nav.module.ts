import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopNavComponent } from './top-nav.component';
import { RouterModule } from '@angular/router';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, RouterModule, UiMaterialModule],
  declarations: [TopNavComponent],
  exports: [TopNavComponent],
})
export class TopNavModule {}
