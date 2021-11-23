export interface NxGenerator {
  name: string;
  cmd: string;
  form: NxGeneratorForm;
}

export interface NxGeneratorForm {
  checkboxes: ICheckbox[];
  dropDowns: IDropdown[];
  textInputs: ITextInput[];
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
  selectedItem?: string;
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
    case SupportedNxPackages.react:
      return reactNxGenerators;
    default:
      return null;
  }
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
        { input: '', title: 'importPath', placeholder: 'The library name used to import it, like `@myorg/my-awesome-lib`. Must be a valid npm name.', },
      ],
      checkboxes: [
        { isChecked: false, title: 'buildable', placeholder: 'Generate a buildable library' },
        { isChecked: false, title: 'enableIvy', placeholder: 'Enable Ivy for lib in tsconfig.lib.prod.json' },
        { isChecked: false, title: 'addModuleSpecFile', placeholder: 'Add a module spec file' },
      ],
      dropDowns: []
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
        { title: 'backendProject', placeholder: 'Backend project that provides data to this application. This sets up proxy.config.json' },
        { title: 'host', placeholder: 'The name of the host application that the remote application will be consumed by' },
        { title: 'port', placeholder: 'The port at which the remote application should be served' },
      ],
      checkboxes: [
        { title: 'routing', placeholder: 'Generate a routing module' }
      ],
      dropDowns: [
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'sass', 'css', 'less', 'none'], selectedItem: 'scss' },
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
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'sass', 'css', 'less', 'none'], selectedItem: 'scss' },
        { title: 'changeDetection', placeholder: 'The change detection strategy to use in the new component.', items: ['Default', 'OnPush'], selectedItem: 'Default' },
        { title: 'viewEncapsulation', placeholder: 'The view encapsulation strategy to use in the new component.', items: ['Emulated', 'ShadowDom', 'None'], selectedItem: 'ShadowDom' },
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
  /////////////////////////////////////////////////
  /////////////// Angular interceptor
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - interceptor`,
    cmd: 'nx generate @nrwl/angular:interceptor',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the interceptor.', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the interceptor is placed.' },
      ],
      checkboxes: [
        { title: 'flat', placeholder: 'Create interceptor at the source root rather than its own directory' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new interceptor.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////// Angular class
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - class`,
    cmd: 'nx generate @nrwl/angular:class',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the new class.', isRequired: true },
        { title: 'directory', placeholder: 'The path at which to create the class, relative to the workspace root.' },
        { title: 'type', placeholder: 'Adds a developer-defined type to the filename, in the format "name.type.ts".' },
      ],
      checkboxes: [
        { title: 'skipTests', placeholder: 'Do not create "spec.ts" test files for the new class.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular app-shell
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - app-shell`,
    cmd: 'nx generate @nrwl/angular:app-shell',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the new app-shell.', isRequired: true },
        { title: 'appDir', placeholder: 'The name of the application directory.' },
        { title: 'appId', placeholder: 'The app ID to use in withServerTransition().' },
        { title: 'main', placeholder: 'The name of the main entry-point file.' },
        { title: 'rootModuleClassName', placeholder: 'The name of the root module class.' },
        { title: 'rootModuleFileName', placeholder: 'The name of the root module file.' },
        { title: 'route', placeholder: 'Route path used to produce the app shell.' },
      ],
      checkboxes: [
        { title: 'skipTests', placeholder: 'Do not create "spec.ts" test files for the new app-shell.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular ngrx
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - ngrx`,
    cmd: 'nx generate @nrwl/angular:ngrx',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'Name of the NgRx feature state, such as `products` or `users`. Recommended to use the plural form of the name.', isRequired: true },
        { title: 'module ', placeholder: 'The path to the `NgModule` where the feature state will be registered. The host directory will create/use the new state directory.', isRequired: true },
        { title: 'directory', placeholder: 'The name of the folder used to contain/group the generated NgRx files.' },
      ],
      checkboxes: [
        { title: 'barrels', placeholder: 'Use barrels to re-export actions, state and selectors.' },
        { title: 'facade', placeholder: 'Create a Facade class for the the feature.' },
        { title: 'minimal', placeholder: 'Only register the root state management setup or feature state.' },
        { title: 'root', placeholder: 'Setup root or feature state management with NgRx.' },
        { title: 'skipFormat', placeholder: 'Skip formatting files.' },
        { title: 'skipImport', placeholder: 'Generate NgRx feature files without registering the feature in the NgModule.' },
        { title: 'skipPackageJson', placeholder: 'Do not update the `package.json` with NgRx dependencies.' },
        { title: 'useDataPersistence', placeholder: 'Generate NgRx Effects with the `DataPersistence` helper service. Set to false to use plain effects data persistence operators.' },
      ],
      dropDowns: [
        { title: 'syntax', placeholder: 'Specifies whether to use class-based or creator functions for actions, reducers, and effects.', items: ['creators', 'classes'] },
      ]
    }
  },
];


/************************************************
 ************************************************
 ************ React Generators
 ************************************************
 ************************************************/
export const reactNxGenerators: NxGenerator[] = [
  /////////////////////////////////////////////////
  /////////////// React application
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/react - application`,
    cmd: 'npx nx generate @nrwl/react:application',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the application', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the application is placed' },
        { title: 'prefix', placeholder: 'Prefix to apply to generated selectors' },
        { title: 'backendProject', placeholder: 'Backend project that provides data to this application. This sets up proxy.config.json' },
        { title: 'host', placeholder: 'The name of the host application that the remote application will be consumed by' },
        { title: 'port', placeholder: 'The port at which the remote application should be served' },
      ],
      checkboxes: [
        { title: 'js', placeholder: 'Generate JavaScript files rather than TypeScript files.' },
        { title: 'globalCss', placeholder: 'Default is false. When true, the component is generated with *.css/*.scss instead of *.module.css/*.module.scss' },
        { title: 'classComponent', placeholder: 'Use class components instead of functional component.' },
        { title: 'pascalCaseFiles', placeholder: 'Use pascal case component file name (e.g. App.tsx).' },
        { title: 'routing', placeholder: 'Generate application with routes.' },
        { title: 'setParserOptionsProject', placeholder: 'Whether or not to configure the ESLint "parserOptions.project" option. We do not do this by default for lint performance reasons.' },
        { title: 'skipFormat', placeholder: 'Skip formatting files.' },
        { title: 'strict', placeholder: 'Creates an application with stricter type checking and build optimization options.' },
      ],
      dropDowns: [
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'styl', 'less', 'styled-components', '@emotion/styled', 'styled-jsx', 'none'], selectedItem: 'scss' },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////// React library
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/react - library`,
    cmd: 'npx nx generate @nrwl/react:library',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the library', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the library is placed' },
        { title: 'importPath', placeholder: 'The library name used to import it, like @myorg/my-awesome-lib' },
        { title: 'appProject', placeholder: 'The application project to add the library route to.' },
      ],
      checkboxes: [
        { title: 'buildable', placeholder: 'Generate a buildable library.' },
        { title: 'component', placeholder: 'Generate a default component.' },
        { title: 'publishable', placeholder: 'Create a publishable library.' },
        { title: 'setParserOptionsProject', placeholder: 'Whether or not to configure the ESLint "parserOptions.project" option. We do not do this by default for lint performance reasons.' },
        { title: 'skipTsConfig', placeholder: 'Do not update tsconfig.json for development experience.' },
        { title: 'standaloneConfig', placeholder: 'Split the project configuration into <projectRoot>/project.json rather than including it inside workspace.json' },
        { title: 'js', placeholder: 'Generate JavaScript files rather than TypeScript files.' },
        { title: 'globalCss', placeholder: 'Default is false. When true, the component is generated with *.css/*.scss instead of *.module.css/*.module.scss' },
        { title: 'classComponent', placeholder: 'Use class components instead of functional component.' },
        { title: 'pascalCaseFiles', placeholder: 'Use pascal case component file name (e.g. App.tsx).' },
        { title: 'routing', placeholder: 'Generate library with routes.' },
        { title: 'skipFormat', placeholder: 'Skip formatting files.' },
        { title: 'strict', placeholder: 'Creates an library with stricter type checking and build optimization options.' },
      ],
      dropDowns: [
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'styl', 'less', 'styled-components', '@emotion/styled', 'styled-jsx', 'none'], selectedItem: 'scss' },
        { title: 'unitTestRunner', placeholder: 'Test runner to use for unit tests.', items: ['jest', 'none'], selectedItem: 'jest' },
        { title: 'linter', placeholder: 'The tool to use for running lint checks.', items: ['eslint', 'tslint'], selectedItem: 'eslint' },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////// React component
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/react - component`,
    cmd: 'npx nx generate @nrwl/react:component',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the component', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the component is placed' },
      ],
      checkboxes: [
        { title: 'js', placeholder: 'Generate JavaScript files rather than TypeScript files.' },
        { title: 'globalCss', placeholder: 'Default is false. When true, the component is generated with *.css/*.scss instead of *.module.css/*.module.scss' },
        { title: 'pascalCaseFiles', placeholder: 'Use pascal case component file name (e.g. App.tsx).' },
        { title: 'pascalCaseDirectory', placeholder: 'Use pascal case directory name (e.g. App/App.tsx).' },
        { title: 'routing', placeholder: 'Generate component with routes.' },
        { title: 'classComponent', placeholder: 'Use class components instead of functional component.' },
        { title: 'skipTests', placeholder: 'When true, does not create "spec.ts" test files for the new component.' },
      ],
      dropDowns: [
        { title: 'style', placeholder: 'The file extension or preprocessor to use for style files, or "none" to skip generating the style file.', items: ['scss', 'styl', 'less', 'styled-components', '@emotion/styled', 'styled-jsx', 'none'], selectedItem: 'scss' },
        { title: 'project', placeholder: 'The name of the project.', items: [], isRequired: true },
      ]
    }
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// React redux
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/react - redux`,
    cmd: 'npx nx generate @nrwl/react:redux',
    form: {
      textInputs: [
        { title: 'name', placeholder: 'Redux slice name.', isRequired: true },
        { title: 'directory', placeholder: 'The name of the folder used to contain/group the generated Redux files.' },
        { title: 'appProject', placeholder: 'The application project to add the slice to.' },
      ],
      checkboxes: [
        { title: 'js', placeholder: 'Generate JavaScript files rather than TypeScript files.' },
      ],
      dropDowns: [
        { title: 'project', placeholder: 'The name of the project to add the slice to. If it is an application, then the store configuration will be updated too.', items: [], isRequired: true },
      ]
    }
  }
];
