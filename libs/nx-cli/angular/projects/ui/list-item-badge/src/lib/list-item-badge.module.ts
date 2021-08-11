import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemBadgeComponent } from './list-item-badge.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ListItemBadgeComponent
  ],
  exports: [
    ListItemBadgeComponent
  ]
})
export class ListItemBadgeModule {}
