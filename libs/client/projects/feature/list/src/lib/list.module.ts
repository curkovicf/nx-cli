import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { SearchBarModule } from '@nx-cli/client/shared/ui/search';
import { ListItemModule } from '@nx-cli/client/projects/ui/list-item';
import { ListItemBadgeModule } from '@nx-cli/client/projects/ui/list-item-badge';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';

@NgModule({
  imports: [CommonModule, MaterialModule, SearchBarModule, ListItemModule, ListItemBadgeModule, ButtonModule],
  declarations: [ListComponent],
  exports: [ListComponent],
})
export class ListModule {}
