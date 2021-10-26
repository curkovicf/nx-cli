import { Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
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
  @ViewChild('mainForm', { read: ViewContainerRef })
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
  ngOnInit(): void {

    // this.form = new FormGroup({
    //   name: new FormControl('', [Validators.required]),
    //   directory: new FormControl(''),
    //   importPath: new FormControl(''),
    //   addModuleSpecFile: new FormControl(false),
    //   buildable: new FormControl(false),
    //   enableIvy: new FormControl(false),
    //   // publishable: new FormControl(false),
    //   // simpleModuleName: new FormControl(false),
    //   prefix: new FormControl(''),
    //   tags: new FormControl(''),
    // });

    this.form = this.formBuilder.group({});
    this.injectForm();
  }

  private injectForm(): void {
    this.data?.form.textInputs.forEach(textInput => {
      this.mainForm
        .createComponent(this.createInputComponent())
        .changeDetectorRef
        .detectChanges();
    })

    this.data?.form.checkboxes.forEach(checkbox => {
      this.mainForm
        .createComponent(this.createCheckboxComponent())
        .changeDetectorRef
        .detectChanges();
    })
  }

  private createInputComponent() {
    return this.componentFactory.resolveComponentFactory(InputComponent);
  }

  private createCheckboxComponent() {
    return this.componentFactory.resolveComponentFactory(CheckboxComponent);
  }

  public onSubmit(): void {
    if (!this.isFormValid()) {
      return;
    }

    this.dialogRef.close(this.generateDto());
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
