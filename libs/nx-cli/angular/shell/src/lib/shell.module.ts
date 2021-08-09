import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';

@NgModule({
  imports: [CommonModule, RoutingModule, RouterModule],
  declarations: [
    LayoutComponent
  ],
})
export class ShellModule {}
