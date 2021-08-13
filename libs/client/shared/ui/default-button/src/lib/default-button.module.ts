import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './default-button.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    DefaultButtonComponent
  ],
  exports: [
    DefaultButtonComponent
  ]
})
export class DefaultButtonModule {}
