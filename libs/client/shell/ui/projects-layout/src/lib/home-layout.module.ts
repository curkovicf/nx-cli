import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout.component';

import { ProjectListModule } from '@nx-cli/client/projects/feature/list';
import { ProjectDetailModule } from '@nx-cli/client/projects/feature/detail';
import { ProjectActionsModule } from '@nx-cli/client/projects/feature/actions';

@NgModule({
  imports: [
    CommonModule,
    ProjectListModule,
    ProjectDetailModule,
    ProjectActionsModule,
  ],
  declarations: [HomeLayoutComponent],
})
export class HomeLayoutModule {}
