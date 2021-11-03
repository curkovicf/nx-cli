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
import { BaseFormElement, NxGenerator, ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';
import { InputComponent } from '@nx-cli/client/shared/ui/input';
import { CheckboxComponent } from '@nx-cli/client/shared/ui/checkbox';

export type NxGeneratorParseFn<T extends NxGenerator> = (nxGenerator: T) => { cmd: string, args: string[] };

export interface MatDialogData {
  nxGenerator: NxGenerator;
  parseFn: <T extends NxGenerator>(nxGenerator: T) => { cmd: string, args: string[] };
}

@Component({
  selector: 'nx-cli-new-lib-form',
  templateUrl: './generator-dialog.component.html',
  styleUrls: ['./generator-dialog.component.scss'],
})
export class GeneratorDialogComponent extends NxCliDialogFormClass<GeneratorDialogComponent> implements OnInit {
  @ViewChild('mainForm', { read: ViewContainerRef, static: true })
  readonly mainForm: ViewContainerRef;

  public form: FormGroup;

  constructor(
    private readonly componentFactory: ComponentFactoryResolver,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly dialogRef: MatDialogRef<GeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: MatDialogData
  ) {
    super(dialogRef);

    this.changeDetectorRef.detach();
  }

  get generatorForm(): FormArray {
    return this.form.controls["mainForm"] as FormArray;
  }

  get combinedFormElements(): BaseFormElement[] {
    return [...this.data.nxGenerator.form.checkboxes, ...this.data.nxGenerator.form.textInputs];
  }

  //  Form array reference
  //  https://www.telerik.com/blogs/angular-basics-creating-dynamic-forms-using-formarray-angular
  //  https://www.youtube.com/watch?v=aOQ1xFC3amw
  ngOnInit(): void {
    this.createForm();
    // this.injectForm();

    this.generatorForm.valueChanges.subscribe(changes => console.log(changes))

    this.changeDetectorRef.reattach();
    this.changeDetectorRef.detectChanges();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      mainForm: this.formBuilder.array([
        ...this.data.nxGenerator.form.textInputs.map(textBoxItem => textBoxItem.isRequired ?
          this.formBuilder.control('', [Validators.required]) :
          this.formBuilder.control('')),
        ...this.data.nxGenerator.form.checkboxes.map(checkboxItem => ({ [checkboxItem.title]: this.formBuilder.control(false) }))
      ])
    });
  }

  private injectForm(): void {
    this.data?.nxGenerator.form.textInputs.forEach(textInput => {
      const component = this.mainForm.createComponent(this.createInputComponent());

      // component.instance.formControlName = textInput.title;
      component.instance.title = textInput.title;
      component.instance.description = textInput.placeholder;

      component.changeDetectorRef.detectChanges();
    })

    this.data?.nxGenerator.form.checkboxes.forEach(checkbox => {
      const component = this.mainForm.createComponent(this.createCheckboxComponent());

      // component.instance.formControlName = checkbox.title;
      component.instance.title = checkbox.title;
      component.instance.description = checkbox.placeholder;
      component.instance.isChecked = false;

      component.changeDetectorRef.detectChanges();
    })
  }

  private createInputComponent() {
    return this.componentFactory.resolveComponentFactory(InputComponent);
  }

  private createCheckboxComponent() {
    return this.componentFactory.resolveComponentFactory(CheckboxComponent);
  }

  public onSubmit(): void {
    console.log(this.generatorForm.controls[0].value);

    console.log(this.data.parseFn({
      ...this.data.nxGenerator,
      form: {
        textInputs: this.generatorForm.controls
          .map((textInput, index) => (index <= this.data.nxGenerator.form.textInputs.length ? {
            ...this.combinedFormElements[index]
          } : null))
          .filter(textInput => !!textInput)
      }
    }));
    // console.log(arr);

    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close();
  }

  private generateDto(): Partial<ProjectsIpcDtos.GenerateAngularLibrary> {
    return {
      directory: this.form.get('directory').value,
      buildable: this.form.get('buildable').value,
      enableIvy: this.form.get('enableIvy').value,
      importPath: this.form.get('importPath').value,
      tags: this.form.get('tags').value,
      name: this.form.get('name').value,
      prefix: this.form.get('prefix').value,
      publishable: false,
      simpleModuleName: false,
      addModuleSpecFile: this.form.get('addModuleSpecFile').value,
    };
  }
}
