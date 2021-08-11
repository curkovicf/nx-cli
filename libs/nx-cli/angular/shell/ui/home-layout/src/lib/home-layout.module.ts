import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeLayoutComponent } from './home-layout.component';

import { ProjectListModule } from '@dev-workspace/nx-cli/angular/projects/feature/project-list';
import { ProjectDetailModule } from '@dev-workspace/nx-cli/angular/projects/feature/project-detail';
import { ProjectActionsModule } from '@dev-workspace/nx-cli/angular/projects/feature/project-actions';

@NgModule({
  imports: [CommonModule, ProjectListModule, ProjectDetailModule, ProjectActionsModule],
  declarations: [
    HomeLayoutComponent
  ],
})
export class HomeLayoutModule {}
