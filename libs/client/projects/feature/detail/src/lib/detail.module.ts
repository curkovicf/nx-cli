import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailComponent} from './detail.component';
import {ButtonModule} from '@nx-cli/client/shared/ui/button';
import {ListItemBadgeModule} from '@nx-cli/client/projects/ui/list-item-badge';
import {TabItemModule} from '@nx-cli/client/projects/ui/tab-item';
import {TagsModule} from '@nx-cli/client/projects/ui/tags';
import {FolderTreeModule} from '@nx-cli/client/projects/ui/folder-tree';

@NgModule({
  imports: [
    CommonModule,
    ButtonModule,
    ListItemBadgeModule,
    TabItemModule,
    TagsModule,
    FolderTreeModule,
  ],
  declarations: [DetailComponent],
  exports: [DetailComponent],
  providers: [],
})
export class DetailModule {}
