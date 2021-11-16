export interface NxGenerator {
  name: string;
  cmd: string;
  form: NxGeneratorForm;
}

export interface NxGeneratorForm {
  checkboxes?: ICheckbox[];
  dropDowns?: IDropdown[];
  textInputs?: ITextInput[];
}

export function getNxGeneratorDir(nxGenerator: NxGenerator): string | undefined {
  return nxGenerator.form.textInputs.find(o => o.title === 'directory').input;
}

export function getNxGeneratorName(nxGenerator: NxGenerator): string | undefined {
  return nxGenerator.form.textInputs.find(o => o.title === 'directory').input;
}

export function getNxGeneratorFieldValue(nxGenerator: NxGenerator, field: string): string | undefined {
  return nxGenerator.form.textInputs.find(o => o.title === field)?.input;
}

export enum FormType {
  text,
  checkbox,
  dropdown
}

export interface BaseFormElement {
  title: string;
  placeholder: string;
  isRequired?: boolean;
}

export interface ICheckbox extends BaseFormElement {
  isChecked?: boolean;
}

export interface IDropdown extends BaseFormElement {
  items: string[];
  selected?: string;
}

export interface ITextInput extends BaseFormElement {
  input?: string;
}

export enum SupportedNxPackages {
  angular = '@nrwl/angular',
  workspace = '@nrwl/workspace',
  electron = 'nx-electron',
  flutter = '@nxrocks/nx-flutter',
  vue = '@nx-plus/vue',
  react = '@nrwl/react',
  nestjs = '@nrwl/nest',
  node = '@nrwl/node',
  svelte = '@nxext/svelte',
  web = '@nrwl/web',
}

export const supportedNxPackagesAsList = Object.values(SupportedNxPackages);


export function getNxGenerator(supportedNxGenerator: SupportedNxPackages): NxGenerator[] {
  switch (supportedNxGenerator) {
    case SupportedNxPackages.angular:
      return angularNxGenerators;
    case SupportedNxPackages.workspace:
      break;
    case SupportedNxPackages.electron:
      break;
    case SupportedNxPackages.flutter:
      break;
    case SupportedNxPackages.vue:
      break;
    case SupportedNxPackages.react:
      break;
    case SupportedNxPackages.nestjs:
      break;
    case SupportedNxPackages.node:
      break;
    case SupportedNxPackages.svelte:
      break;
    case SupportedNxPackages.web:
      break;
  }

  return null;
}


/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////// GENERATORS
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



/************************************************
 ************************************************
 ************ Angular Generators
 ************************************************
************************************************/
export const angularNxGenerators: NxGenerator[] = [
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular lib
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  //  TODO: Add later, currently it is breaking the app for some reason
  //  checkbox: publishable, placeholder: Generate a publishable library
  //  checkbox: simpleModuleName, placeholder: Keep the module name simple while using &#45;&#45;directory
  {
    name: `@nrwl/angular - library`,
    cmd: 'nx generate @nrwl/angular:lib',
    form: {
      textInputs: [
        { isRequired: true, input: '', title: 'name', placeholder: 'The name of the library' },
        { input: '', title: 'directory', placeholder: 'A directory where the library is placed', },
        { input: '', title: 'prefix', placeholder: 'Prefix to apply to generated selectors', },
        { input: '', title: 'tags', placeholder: 'Add tags to the library', },
        { input: '', title: 'importPath', placeholder: 'The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.', },
      ],
      checkboxes: [
        { isChecked: false, title: 'buildable', placeholder: 'Generate a buildable library' },
        { isChecked: false, title: 'enableIvy', placeholder: 'Enable Ivy for lib in tsconfig.lib.prod.json' },
        { isChecked: false, title: 'addModuleSpecFile', placeholder: 'Add a module spec file' },
      ],
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular application
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - application`,
    cmd: 'nx generate @nrwl/angular:application',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the application', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the application is placed' },
        { title: 'prefix', placeholder: 'Prefix to apply to generated selectors' },
        { title: 'tags', placeholder: 'Add tags to the application' },
        { title: 'backendProject', placeholder: 'Backend project that provides data to this application. This sets up proxy.config.json' },
        { title: 'host', placeholder: 'The name of the host application that the remote application will be consumed by' },
        { title: 'port', placeholder: 'The port at which the remote application should be served' },
      ],
      checkboxes: [
        { title: 'routing', placeholder: 'Generate a routing module' }
      ],
      dropDowns: [
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'sass', 'css', 'less', 'none'] },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular component
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - component`,
    cmd: 'nx generate @nrwl/angular:component',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the component.', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the component is placed.' },
        { title: 'selector', placeholder: 'The HTML selector to use for this component.' },
      ],
      checkboxes: [
        { title: 'export', placeholder: 'When true, the component is exported from the project index.ts (if it exists).' },
        { title: 'flat', placeholder: 'Create component at the source root rather than its own directory' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new component.' },
        { title: 'inlineStyle', placeholder: 'Include styles inline in the component.ts file. Only CSS styles can be included inline. By default, an external styles file is created and referenced in the component.ts file.' },
        { title: 'inlineTemplate', placeholder: 'Include template inline in the component.ts file. By default, an external template file is created and referenced in the component.ts file.' },
        { title: 'displayBlock', placeholder: 'Specifies if the style will contain `:host { display: block; }`.' },
        { title: 'skipImport', placeholder: 'Do not import this component into the owning NgModule.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'sass', 'css', 'less', 'none'] },
        { title: 'changeDetection', placeholder: 'The change detection strategy to use in the new component.', items: ['Default', 'OnPush'] },
        { title: 'viewEncapsulation', placeholder: 'The view encapsulation strategy to use in the new component.', items: ['Emulated', 'ShadowDom', 'None'] },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular service
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - service`,
    cmd: 'nx generate @nrwl/angular:service',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the service.', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the service is placed.' },
      ],
      checkboxes: [
        { title: 'flat', placeholder: 'Create service at the source root rather than its own directory' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new service.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular pipe
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - pipe`,
    cmd: 'nx generate @nrwl/angular:pipe',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the pipe.', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the pipe is placed.' },
      ],
      checkboxes: [
        { title: 'flat', placeholder: 'Create pipe at the source root rather than its own directory' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new pipe.' },
        { title: 'skipImport', placeholder: 'Do not import this pipe into the owning NgModule.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////// Angular directive
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - directive`,
    cmd: 'nx generate @nrwl/angular:directive',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the directive.', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the directive is placed.' },
        { title: 'selector', placeholder: 'The HTML selector to use for this directive.' },
      ],
      checkboxes: [
        { title: 'export', placeholder: 'When true, the directive is exported from the project index.ts (if it exists).' },
        { title: 'flat', placeholder: 'Create directive at the source root rather than its own directory' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new directive.' },
        { title: 'skipImport', placeholder: 'Do not import this directive into the owning NgModule.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
];
