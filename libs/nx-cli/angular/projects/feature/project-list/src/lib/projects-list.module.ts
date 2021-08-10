import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ProjectListComponent
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectsListModule {}
