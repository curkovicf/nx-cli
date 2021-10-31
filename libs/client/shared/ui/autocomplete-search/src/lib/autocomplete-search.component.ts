import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatAutocomplete } from '@angular/material/autocomplete';


@Component({
  selector: 'nx-cli-autocomplete-search',
  templateUrl: './autocomplete-search.component.html',
  styleUrls: ['./autocomplete-search.component.scss']
})
export class AutocompleteSearchComponent implements OnInit {
  @ViewChild('inputField', { static: true })
  readonly inputField: ElementRef;

  @ViewChild(MatAutocomplete, { static: true })
  readonly autoCompleteElement: MatAutocomplete;

  public control = new FormControl();
  public filteredElements: Observable<string[]>;

  constructor(
    public readonly dialogRef: MatDialogRef<AutocompleteSearchComponent>,
    private readonly changeDetectorRef: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: string[]
  ) {}

  ngOnInit(): void {
    this.filteredElements = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );

    this.changeDetectorRef.detectChanges();

    setTimeout(() => this.inputField.nativeElement.focus(), 150);
  }

  private filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.data.filter(items => this.normalizeValue(items).includes(filterValue));
  }

  private normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
}
