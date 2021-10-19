import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteSearchComponent } from './autocomplete-search.component';
import { MaterialModule } from '@nx-cli/client/shared/ui/material-modules';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, MaterialModule, ReactiveFormsModule],
  declarations: [
    AutocompleteSearchComponent
  ],
  exports: [
    AutocompleteSearchComponent
  ]
})
export class AutocompleteSearchModule {}
