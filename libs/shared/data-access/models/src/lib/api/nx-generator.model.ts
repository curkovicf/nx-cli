import { angularNxGenerators } from '../nx-generators/angular.generator';

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

// export const supportedNxPackages: NxPackage[] = [
//   { name: 'Angular', npmName: '@nrwl/angular' },
//   { name: 'Nx Workspaces', npmName: '@nrwl/workspace' },
//   { name: 'Electron', npmName: 'nx-electron' },
//   { name: 'Flutter', npmName: '@nxrocks/nx-flutter' },
//   { name: 'Vue', npmName: '@nx-plus/vue' },
//   { name: 'React', npmName: '@nrwl/react' },
//   { name: 'Nest', npmName: '@nrwl/nest' },
//   { name: 'Svelte', npmName: '@nxext/svelte' },
//   { name: 'Web Components', npmName: '@nrwl/web' },
// ];

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

SupportedNxPackages.angular.valueOf()

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
