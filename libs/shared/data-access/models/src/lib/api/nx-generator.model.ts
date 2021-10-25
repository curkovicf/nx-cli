export interface NxGenerator {
  name: string;
  form: NxGeneratorForm;
}

export interface NxGeneratorForm {
  checkboxes?: ICheckbox[];
  dropDowns?: IDropdown[];
  textInputs?: ITextInput[];
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
}

export interface ITextInput extends BaseFormElement {
  input?: string;
}

export enum SupportedNxGenerators {
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

export const supportedNxGeneratorsAsList = Object.values(SupportedNxGenerators);


export const angularNxGenerator: NxGenerator = {
  //  TODO: Add later, currently it is breaking the app for some reason
  //  checkbox: publishable, placeholder: Generate a publishable library
  //  checkbox: simpleModuleName, placeholder: Keep the module name simple while using &#45;&#45;directory
  name: SupportedNxGenerators.angular,
  form: {
    textInputs: [
      { isRequired: true, title: 'name', placeholder: 'The name of the library' },
      { title: 'directory', placeholder: 'The name of the library', },
      { title: 'prefix', placeholder: 'Prefix to apply to generated selectors', },
      { title: 'tags', placeholder: 'Add tags to the library', },
      { title: 'importPath', placeholder: 'The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.', },
    ],
    checkboxes: [
      { title: 'buildable', placeholder: 'Generate a buildable library' },
      { title: 'enableIvy', placeholder: 'Enable Ivy for lib in tsconfig.lib.prod.json' },
      { title: 'addModuleSpecFile', placeholder: 'Add a module spec file' },
      { title: 'buildable', placeholder: 'Generate a buildable library' },
    ],
  }
}



export function getNxGenerator(supportedNxGenerator: SupportedNxGenerators): NxGenerator {
  switch (supportedNxGenerator) {
    case SupportedNxGenerators.angular:
      return angularNxGenerator;
    case SupportedNxGenerators.workspace:
      break;
    case SupportedNxGenerators.electron:
      break;
    case SupportedNxGenerators.flutter:
      break;
    case SupportedNxGenerators.vue:
      break;
    case SupportedNxGenerators.react:
      break;
    case SupportedNxGenerators.nestjs:
      break;
    case SupportedNxGenerators.node:
      break;
    case SupportedNxGenerators.svelte:
      break;
    case SupportedNxGenerators.web:
      break;
  }

  return null;
}
