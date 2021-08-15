import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { SearchBarModule } from '@nx-cli/client/projects/ui/search-bar';
import { ListItemModule } from '@nx-cli/client/projects/ui/list-item';
import { ListItemBadgeModule } from '@nx-cli/client/projects/ui/list-item-badge';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SearchBarModule,
    ListItemModule,
    ListItemBadgeModule,
  ],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
