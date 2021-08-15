import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';
import { ListItemBadgeModule } from '@nx-cli/client/projects/ui/list-item-badge';

@NgModule({
  imports: [CommonModule, DefaultButtonModule, ListItemBadgeModule],
  declarations: [DetailComponent],
  exports: [DetailComponent],
  providers: []
})
export class DetailModule {}
