import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NxCliDialogFormClass} from '@nx-cli/client/projects/util';
import {ObjectUtils} from '@nx-cli/shared/util';
import deepCopy = ObjectUtils.deepCopy;
import { NxGenerator } from 'nx-cli-osfn/lib/projects/models/nx-generator.model';

export interface MatDialogData {
  nxGenerator: NxGenerator;
}

///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//////  FIXME: Find better solution for this component
///////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
@Component({
  selector: 'nx-cli-new-lib-form',
  templateUrl: './generator-dialog.component.html',
  styleUrls: ['./generator-dialog.component.scss'],
})
export class GeneratorDialogComponent
  extends NxCliDialogFormClass<GeneratorDialogComponent>
  implements OnInit
{
  @ViewChild('mainForm', {read: ViewContainerRef, static: true})
  readonly mainForm: ViewContainerRef;

  public form: FormGroup;

  constructor(
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly dialogRef: MatDialogRef<GeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: MatDialogData,
  ) {
    super(dialogRef);

    this.changeDetectorRef.detach();
  }

  get textInputsForm(): FormArray {
    return this.form.controls['textInputs'] as FormArray;
  }

  get dropdownsForm(): FormArray {
    return this.form.controls['dropdowns'] as FormArray;
  }

  get checkboxesForm(): FormArray {
    return this.form.controls['checkboxes'] as FormArray;
  }

  //  Form array reference
  //  https://www.telerik.com/blogs/angular-basics-creating-dynamic-forms-using-formarray-angular
  //  https://www.youtube.com/watch?v=aOQ1xFC3amw
  ngOnInit(): void {
    this.createForm();

    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      textInputs: this.formBuilder.array([
        ...this.data.nxGenerator.form.textInputs.map(textBoxItem =>
          textBoxItem.isRequired
            ? this.formBuilder.control('', [Validators.required])
            : this.formBuilder.control(''),
        ),
      ]),
      dropdowns: this.formBuilder.array([
        ...this.data.nxGenerator.form.dropDowns.map(dropdownItem => ({
          [dropdownItem.title]: this.formBuilder.control({
            ...dropdownItem.items,
          }),
        })),
      ]),
      checkboxes: this.formBuilder.array([
        ...this.data.nxGenerator.form.checkboxes.map(checkboxItem => ({
          [checkboxItem.title]: this.formBuilder.control(false),
        })),
      ]),
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.updateNxGeneratorObject());
  }

  private updateNxGeneratorObject(): NxGenerator {
    const textInputs = this.textInputsForm.value;
    const dropdowns = this.dropdownsForm.value;
    const checkboxes = this.checkboxesForm.value;

    const nxGenerator = deepCopy<NxGenerator>(this.data.nxGenerator);

    nxGenerator.form.textInputs.forEach(
      (textInputElement, index) => (textInputElement.input = textInputs[index]),
    );

    nxGenerator.form.checkboxes = nxGenerator.form.checkboxes
      .map((checkBoxElement, index) => ({
        ...checkBoxElement,
        isChecked: checkboxes[index],
      }))
      .filter(
        checkboxElement =>
          typeof checkboxElement.isChecked === 'boolean' && checkboxElement.isChecked,
      );

    console.log(nxGenerator);

    return nxGenerator;
  }

  public onDropdownChange(index: number, $event: string): void {
    this.data.nxGenerator.form.dropDowns[index].selectedItem = $event;
  }
}
