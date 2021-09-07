import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabItemComponent } from './tab-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    TabItemComponent
  ],
  exports: [
    TabItemComponent
  ]
})
export class TabItemModule {}
