import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsLayoutComponent } from './projects-layout.component';

import { ListModule } from '@nx-cli/client/projects/feature/list';
import { DetailModule } from '@nx-cli/client/projects/feature/detail';
import { TagsModule } from '@nx-cli/client/projects/ui/tags';
import { ConsoleModule } from '@nx-cli/client/projects/feature/console';

@NgModule({
  imports: [CommonModule, ListModule, DetailModule, TagsModule, ConsoleModule],
  declarations: [ProjectsLayoutComponent],
})
export class ProjectsLayoutModule {}
