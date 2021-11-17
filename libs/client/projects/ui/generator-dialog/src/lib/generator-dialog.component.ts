import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  Inject,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { NxGenerator } from '@nx-cli/shared/data-access/models';
import { ObjectUtils } from '@nx-cli/shared/util';
import deepCopy = ObjectUtils.deepCopy;


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
export class GeneratorDialogComponent extends NxCliDialogFormClass<GeneratorDialogComponent> implements OnInit {
  @ViewChild('mainForm', { read: ViewContainerRef, static: true })
  readonly mainForm: ViewContainerRef;

  public htmlFormElements: string[];
  public form: FormGroup;

  constructor(
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly dialogRef: MatDialogRef<GeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: MatDialogData
  ) {
    super(dialogRef);

    this.htmlFormElements = [
      ...this.data.nxGenerator.form.textInputs.map(() => 'text-input'),
      ...this.data.nxGenerator.form.dropDowns.map(() => 'dropdown'),
      ...this.data.nxGenerator.form.checkboxes.map(() => 'checkbox'),
    ]

    this.changeDetectorRef.detach();
  }

  get generatorForm(): FormArray {
    return this.form.controls["mainForm"] as FormArray;
  }

  get textInputsCount(): number {
    return this.data.nxGenerator.form.textInputs.length;
  }

  get checkboxesCount(): number {
    return this.data.nxGenerator.form.checkboxes.length;
  }

  get dropdownsCount(): number {
    return this.data.nxGenerator.form.dropDowns.length;
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
      mainForm: this.formBuilder.array([
        ...this.data.nxGenerator.form.textInputs.map(textBoxItem =>
          textBoxItem.isRequired ?
            this.formBuilder.control('', [Validators.required]) :
            this.formBuilder.control('')),
        ...this.data.nxGenerator.form.dropDowns.map(dropdownItem => ({ [dropdownItem.title]: this.formBuilder.control({
            ...dropdownItem.items
          }) })),
        ...this.data.nxGenerator.form.checkboxes.map(checkboxItem => ({ [checkboxItem.title]: this.formBuilder.control(false) }))
      ])
    });
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.updateNxGeneratorObject());
  }

  private updateNxGeneratorObject(): NxGenerator {
    const nxGenerator = deepCopy<NxGenerator>(this.data.nxGenerator);
    const formArrayValues = this.generatorForm.value;

    nxGenerator.form.textInputs
      .forEach((textInputElement, index) => textInputElement.input = formArrayValues[index]);

    nxGenerator.form.checkboxes
      .forEach((checkBoxElement, index) => {
        const currCheckbox = formArrayValues[index + this.dropdownsCount + this.textInputsCount];

        if (typeof currCheckbox == "boolean") {
          checkBoxElement.isChecked = formArrayValues[index + this.textInputsCount]
        } else {
          checkBoxElement.isChecked = false;
        }
      });

    console.log(nxGenerator);

    return nxGenerator;
  }

  public onDropdownChange(index: number, $event: string): void {
    this.data.nxGenerator.form.dropDowns[index].selectedItem = $event;
  }
}
