import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsLayoutComponent } from './projects-layout.component';

import { ListModule } from '@nx-cli/client/projects/feature/list';
import { DetailModule } from '@nx-cli/client/projects/feature/detail';
import { ActionsModule } from '@nx-cli/client/projects/feature/actions';

@NgModule({
  imports: [
    CommonModule,
    ListModule,
    DetailModule,
    ActionsModule,
  ],
  declarations: [ProjectsLayoutComponent],
})
export class ProjectsLayoutModule {}
