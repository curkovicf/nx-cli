import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsComponent } from './tags.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, DefaultButtonModule],
  declarations: [TagsComponent],
  exports: [TagsComponent],
})
export class TagsModule {}
