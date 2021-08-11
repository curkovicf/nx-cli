import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { UiMaterialModule } from '@dev-workspace/shared/angular/material/util-material';
import { SearchBarModule } from '@dev-workspace/nx-cli/angular/projects/ui/search-bar';
import { ProjectListItemModule } from '@dev-workspace/nx-cli/angular/projects/ui/project-list-item';
import { ListItemBadgeModule } from '@dev-workspace/nx-cli/angular/projects/ui/list-item-badge';

@NgModule({
  imports: [CommonModule, UiMaterialModule, SearchBarModule, ProjectListItemModule, ListItemBadgeModule],
  declarations: [
    ProjectListComponent
  ],
  exports: [
    ProjectListComponent
  ]
})
export class ProjectListModule {}
