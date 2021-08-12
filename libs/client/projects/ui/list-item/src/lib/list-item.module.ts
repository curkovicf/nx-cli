import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, UiMaterialModule],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
})
export class ListItemModule {}
