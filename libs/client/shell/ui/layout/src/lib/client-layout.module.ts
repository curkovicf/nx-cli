import { NgModule } from '@angular/core';

import { ClientLayoutComponent } from './client-layout.component';
import { TopNavModule } from '@nx-cli/client/shell/ui/top-nav';
import { ChipsBarModule } from '@nx-cli/client/workspaces/ui/chips-bar';
import { CommonModule } from '@angular/common';
import { DrawerModule } from '@nx-cli/client/shell/ui/drawer';
import { AddNxProjectFormModule } from '@nx-cli/client/workspaces/feature';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [TopNavModule, ChipsBarModule, CommonModule, DrawerModule, AddNxProjectFormModule, RouterModule],
  declarations: [ClientLayoutComponent],
  exports: [ClientLayoutComponent]
})
export class ClientLayoutModule {}
