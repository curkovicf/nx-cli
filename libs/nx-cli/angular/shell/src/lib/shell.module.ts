import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing.module';
import { MaterialProgressBarModule } from '@dev-workspace/shared/angular/material/ui-progress-bar';
import { ProjectsListModule } from '@dev-workspace/nx-cli/angular/projects/feature/project-list';

@NgModule({
  imports: [CommonModule, RoutingModule, RouterModule, MaterialProgressBarModule, ProjectsListModule],
  declarations: [
    LayoutComponent
  ],
})
export class ShellModule {}
