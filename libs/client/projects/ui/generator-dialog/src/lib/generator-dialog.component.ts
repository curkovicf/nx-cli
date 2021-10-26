import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NxCliDialogFormClass } from '@nx-cli/client/projects/util';
import { NxGenerator, ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';
import { InputComponent } from '../../../../../shared/ui/input/src/lib/input.component';
import { CheckboxComponent } from '@nx-cli/client/shared/ui/checkbox';

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
    public readonly dialogRef: MatDialogRef<GeneratorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: NxGenerator
  ) {
    super(dialogRef);
  }

  get generatorForm(): FormArray {
    return this.form.controls["nx-generator"] as FormArray;
  }

  //  Form array reference
  //  https://www.telerik.com/blogs/angular-basics-creating-dynamic-forms-using-formarray-angular
  //  https://www.youtube.com/watch?v=aOQ1xFC3amw
  ngOnInit(): void {
    console.log(this.data);

    this.form = this.formBuilder.group({
      mainForm: this.formBuilder.array([
        ...this.data.form.checkboxes.map(checkboxItem => ({ [checkboxItem.title]: this.formBuilder.control(false) })),
        ...this.data.form.textInputs.map(textBoxItem => ({
          [textBoxItem.title]: textBoxItem.isRequired ?
            this.formBuilder.control('', [Validators.required]) :
            this.formBuilder.control('')
        }))
      ])
    });

    this.injectForm();
  }

  private injectForm(): void {
    this.data?.form.textInputs.forEach(textInput => {
      const component = this.mainForm.createComponent(this.createInputComponent());

      component.instance.formControlName = textInput.title;
      component.instance.title = textInput.title;
      component.instance.description = textInput.placeholder;

      component.changeDetectorRef.detectChanges();
    })

    this.data?.form.checkboxes.forEach(checkbox => {
      const component = this.mainForm.createComponent(this.createCheckboxComponent());

      component.instance.formControlName = checkbox.title;
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
    console.log(this.form);

    const arr = this.form.get('mainForm') as FormArray;
    console.log(arr);
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
