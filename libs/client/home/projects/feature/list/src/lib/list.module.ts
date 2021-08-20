import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { SearchBarModule } from '@nx-cli/client/shared/ui/search';
import { ListItemModule } from '@nx-cli/client/home/projects/ui/list-item';
import { ListItemBadgeModule } from '@nx-cli/client/home/projects/ui/list-item-badge';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, MaterialModule, SearchBarModule, ListItemModule, ListItemBadgeModule, DefaultButtonModule],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
