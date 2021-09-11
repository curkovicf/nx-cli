import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FolderTreeComponent } from './folder-tree.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FolderTreeComponent
  ],
  exports: [
    FolderTreeComponent
  ]
})
export class FolderTreeModule {}
