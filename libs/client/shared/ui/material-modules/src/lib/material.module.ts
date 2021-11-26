import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatOptionModule, MatRippleModule} from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {NgxElectronModule} from 'ngx-electron';
import {MatGridListModule} from '@angular/material/grid-list';
import {NgxChildProcessModule} from 'ngx-childprocess';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  imports: [
    CommonModule,
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    NgxElectronModule,
    NgxChildProcessModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatRippleModule,
    MatListModule,
    MatIconModule,
    MatChipsModule,
    MatGridListModule,
    MatDialogModule,
    NgxElectronModule,
    NgxChildProcessModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    MatSnackBarModule,
    MatOptionModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
  ],
})
export class MaterialModule {}
