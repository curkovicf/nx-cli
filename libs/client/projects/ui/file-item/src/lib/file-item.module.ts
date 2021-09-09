import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileItemComponent } from './file-item.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    FileItemComponent
  ],
  exports: [
    FileItemComponent
  ]
})
export class FileItemModule {}
