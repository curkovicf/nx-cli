import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListItemComponent } from './project-list-item.component';
import { UiMaterialModule } from '@nx-cli/client/shared/ui/material-modules';

@NgModule({
  imports: [CommonModule, UiMaterialModule],
  declarations: [ProjectListItemComponent],
  exports: [ProjectListItemComponent],
})
export class ProjectListItemModule {}
