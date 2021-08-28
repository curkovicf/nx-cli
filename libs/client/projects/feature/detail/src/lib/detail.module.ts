import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { ButtonModule } from '@nx-cli/client/shared/ui/button';
import { ListItemBadgeModule } from '@nx-cli/client/projects/ui/list-item-badge';

@NgModule({
  imports: [CommonModule, ButtonModule, ListItemBadgeModule],
  declarations: [DetailComponent],
  exports: [DetailComponent],
  providers: [],
})
export class DetailModule {}
