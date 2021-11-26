import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConsoleComponent} from './console.component';
import {ButtonModule} from '@nx-cli/client/shared/ui/button';

@NgModule({
  imports: [CommonModule, ButtonModule],
  declarations: [ConsoleComponent],
  exports: [ConsoleComponent],
})
export class ConsoleModule {}
