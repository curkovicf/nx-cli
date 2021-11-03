import { StringUtils } from '@nx-cli/shared/util';


export interface NxGenerator {
  name: string;
  cmd: string;
  form: NxGeneratorForm;
  type: GeneratorType;
}

export enum GeneratorType {
  ngLibrary,
  ngApp
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
/////////////// GENERATORS IMPL
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////



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
    cmd: 'nx g lib',
    type: GeneratorType.ngLibrary,
    form: {
      textInputs: [
        { isRequired: true, input: '', title: 'name', placeholder: 'The name of the library' },
        { input: '', title: 'directory', placeholder: 'The name of the library', },
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
  // {
  //   name: `@nrwl/angular - application`,
  //   cmd: 'nx g app',
  //   form: {
  //     textInputs: [
  //       { title: 'name', placeholder: 'The name of the application', isRequired: true },
  //       { title: 'directory', placeholder: 'A directory where the application is placed', isRequired: true },
  //       { title: 'prefix', placeholder: 'Prefix to apply to generated selectors', isRequired: true },
  //       { title: 'tags', placeholder: 'Add tags to the application', isRequired: true },
  //       { title: 'backendProject', placeholder: 'Backend project that provides data to this application. This sets up proxy.config.json', isRequired: true },
  //       { title: 'host', placeholder: 'The name of the host application that the remote application will be consumed by', isRequired: true },
  //       { title: 'port', placeholder: 'The port at which the remote application should be served', isRequired: true },
  //     ],
  //     checkboxes: [
  //       { title: 'routing', placeholder: 'Generate a routing module' }
  //     ]
  //   }
  // }
];

/*****************************************************
 /*****************************************************
 /********* GENERATOR PARSES
 /*****************************************************
 /*****************************************************/



/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////// Angular lib
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// export function parseNgLibFormGenerator(form: NxGeneratorForm): { cmd: string, args: string[] } {
//   const dir = StringUtils.removeSpecialCharFrontBack(OsUtils.parsePath(directory));
//   const cmd = OsUtils.parsePath(`nx g lib ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(name)}`);
//   const args = [
//     `--publishable ${form.publishable}`,
//     `--buildable ${form.buildable}`,
//     `--addModuleSpecFile ${form.addModuleSpecFile}`,
//     `--enableIvy ${form.enableIvy}`,
//     form.tags ? `--tags ${StringUtils.removeConsecutiveCommas(form.tags)}` : '',
//     form.prefix ? `--prefix ${form.prefix}` : '',
//     form.importPath ? `--importPath ${form.importPath}` : ''
//   ];
//
//   return { cmd, args };
// }

export type NxGeneratorParseFn = (nxGenerator: NxGenerator) => { cmd: string, args: string[] };

export const getParserFunction = (nxGenerator: NxGenerator) => {
  switch (nxGenerator.type) {
    case GeneratorType.ngLibrary:
      return parseNgLibGenerator;
    case GeneratorType.ngApp:
      return null;
  }
};

export const parseNgLibGenerator: NxGeneratorParseFn = (nxGenerator => {
  const dirLocation = nxGenerator.form.textInputs.find((o) => o.title === 'directory').input;
  const libName = nxGenerator.form.textInputs.find((o) => o.title === 'name').input;

  console.log(nxGenerator);
  console.log('DIRR ', dirLocation);
  console.log('LIBB ', libName);

  const dir = StringUtils.removeSpecialCharFrontBack(dirLocation);
  const cmd = `nx g lib ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(libName)}`;
  const args = [...parseInputForm(nxGenerator.form.textInputs), ...parseCheckboxForm(nxGenerator.form.checkboxes)];

  return { cmd, args };
});

// export function parseForm(nxGeneratorForm: NxGenerator): { cmd: string, args: string[] } {
//   const dirLocation = this.form.textInputs.find((o) => o.title === 'directory').input;
//   const libName = this.form.textInputs.find((o) => o.title === 'name').input;
//
//   const dir = StringUtils.removeSpecialCharFrontBack(dirLocation);
//   const cmd = `nx g lib ${dir ? dir + '/' : ''}${StringUtils.removeSpecialCharacters(libName)}`;
//   const args = [...this.parseInputForm(this.form.textInputs), ...this.parseCheckboxForm(this.form.checkboxes)];
//
//   return { cmd, args };
// }

export function parseCheckboxForm(checkboxes: ICheckbox[]): string[] {
  return checkboxes.map(checkbox => `--${checkbox.title} ${checkbox.isChecked}`);
}

export function parseInputForm(textInputs: ITextInput[]): string[] {
  return textInputs
    .map(textInput => textInput.input ? `--${textInput.title} ${textInput.input}` : '')
    .filter(parsedInput => !!parsedInput);
}
