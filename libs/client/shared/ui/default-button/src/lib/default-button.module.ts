import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultButtonComponent } from './default-button.component';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  imports: [CommonModule, MatRippleModule],
  declarations: [
    DefaultButtonComponent
  ],
  exports: [
    DefaultButtonComponent
  ]
})
export class DefaultButtonModule {}
