import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewTagDialogComponent} from './new-tag-dialog.component';
import {InputModule} from '@nx-cli/client/shared/ui/input';
import {ReactiveFormsModule} from '@angular/forms';
import {CheckboxModule} from '@nx-cli/client/shared/ui/checkbox';
import {ButtonModule} from '@nx-cli/client/shared/ui/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    MatDialogModule,
  ],
  declarations: [NewTagDialogComponent],
})
export class NewTagDialogModule {}
