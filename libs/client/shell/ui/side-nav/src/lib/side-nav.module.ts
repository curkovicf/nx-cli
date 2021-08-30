import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  imports: [CommonModule, MatBadgeModule, MatTooltipModule],
  declarations: [
    SideNavComponent
  ],
  exports: [
    SideNavComponent
  ]
})
export class SideNavModule {}
