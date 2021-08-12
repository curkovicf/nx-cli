import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DetailComponent],
  exports: [DetailComponent],
})
export class DetailModule {}
