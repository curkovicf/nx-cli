import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PopupSearchComponent} from './popup-search.component';
import {InputModule} from '@nx-cli/client/shared/ui/input';

@NgModule({
  imports: [CommonModule, InputModule],
  declarations: [PopupSearchComponent],
  exports: [PopupSearchComponent],
})
export class PopupSearchModule {}
