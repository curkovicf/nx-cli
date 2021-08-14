import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionsComponent } from './actions.component';
import { DefaultButtonModule } from '@nx-cli/client/shared/ui/default-button';

@NgModule({
  imports: [CommonModule, DefaultButtonModule],
  declarations: [ActionsComponent],
  exports: [ActionsComponent],
})
export class ActionsModule {}
