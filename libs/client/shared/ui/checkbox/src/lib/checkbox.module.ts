import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CheckboxComponent} from './checkbox.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [CheckboxComponent],
  exports: [CheckboxComponent],
})
export class CheckboxModule {}
