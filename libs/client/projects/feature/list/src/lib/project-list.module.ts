import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { SearchBarModule } from '@nx-cli/client/projects/ui/search-bar';
import { ProjectListItemModule } from '@nx-cli/client/projects/ui/list-item';
import { ListItemBadgeModule } from '@nx-cli/client/projects/ui/list-item-badge';

@NgModule({
  imports: [
    CommonModule,
    UiMaterialModule,
    SearchBarModule,
    ProjectListItemModule,
    ListItemBadgeModule,
  ],
  declarations: [ProjectListComponent],
  exports: [ProjectListComponent],
})
export class ProjectListModule {}
