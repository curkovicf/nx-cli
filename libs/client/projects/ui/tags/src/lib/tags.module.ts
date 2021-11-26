import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TagsComponent} from './tags.component';
import {ButtonModule} from '@nx-cli/client/shared/ui/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [TagsComponent],
  exports: [TagsComponent],
})
export class TagsModule {}
