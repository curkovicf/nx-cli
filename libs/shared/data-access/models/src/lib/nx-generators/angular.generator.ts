import { NxGenerator } from '../api/nx-generator.model';

export const angularNxGenerators: NxGenerator[] = [
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular lib
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    //  TODO: Add later, currently it is breaking the app for some reason
    //  checkbox: publishable, placeholder: Generate a publishable library
    //  checkbox: simpleModuleName, placeholder: Keep the module name simple while using &#45;&#45;directory
    name: `@nrwl/angular - library`,
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
  },
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////// Angular application
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  {
    name: `@nrwl/angular - application`,
    form: {
      textInputs: [
        { title: 'name', placeholder: 'The name of the application', isRequired: true },
        { title: 'directory', placeholder: 'A directory where the application is placed', isRequired: true },
        { title: 'prefix', placeholder: 'Prefix to apply to generated selectors', isRequired: true },
        { title: 'tags', placeholder: 'Add tags to the application', isRequired: true },
        { title: 'backendProject', placeholder: 'Backend project that provides data to this application. This sets up proxy.config.json', isRequired: true },
        { title: 'host', placeholder: 'The name of the host application that the remote application will be consumed by', isRequired: true },
        { title: 'port', placeholder: 'The port at which the remote application should be served', isRequired: true },
      ],
      checkboxes: [
        { title: 'routing', placeholder: 'Generate a routing module' }
      ]
    }
  }
];
