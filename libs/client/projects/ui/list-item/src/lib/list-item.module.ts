import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [ListItemComponent],
  exports: [ListItemComponent],
})
export class ListItemModule {}
