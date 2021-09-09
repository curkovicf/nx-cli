import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderTreeComponent } from './folder-tree.component';
import { FileItemModule } from '@nx-cli/client/projects/ui/file-item';

@NgModule({
  imports: [CommonModule, FileItemModule],
  declarations: [
    FolderTreeComponent
  ],
  exports: [
    FolderTreeComponent
  ]
})
export class FolderTreeModule {}
