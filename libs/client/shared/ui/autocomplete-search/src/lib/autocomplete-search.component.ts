import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'nx-cli-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})
export class AutocompleteSearchComponent implements OnInit {
  control = new FormControl();
  filteredElements: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<AutocompleteSearchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  ngOnInit(): void {
    this.filteredElements = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.data.filter(items => this.normalizeValue(items).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
