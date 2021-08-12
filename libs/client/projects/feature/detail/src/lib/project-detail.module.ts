import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailComponent } from './project-detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ProjectDetailComponent],
  exports: [ProjectDetailComponent],
})
export class ProjectDetailModule {}
