export enum FileType {
  tsModel = 'model.ts',
  tsFunction = 'function.ts',
  tsClass = 'class.ts',
  ngComponent = 'component.ts',
  htmlComponent = 'component.html',
  cssComponent = 'component.css',
  scssComponent = 'component.scss',
  testComponent = 'component.spec.ts',
  ngService = 'service.ts',
  ngModule = 'module.ts',
  ngGuard = 'guard.ts',
  tsconfig = 'tsconfig',
  eslint = 'eslint',
  readme = '.md',
  unknown = 'unknown',
  ngInterceptor = 'interceptor.ts',
  tsFile = '.ts',
}

export enum FolderType {
  controller = 'controllers',
  service = 'services',
  guard = 'guards',
  interceptors = 'interceptors',
  ui = 'uis',
  view = 'views',
  data = 'data',
  core = 'core',
  domain = 'domains',
  test = 'tests',
  style = 'styles',
  util = 'utils',
  feature = 'features',
  model = 'models',
  unknown = 'unknown',
  api = 'apis',
  src = 'src',
  lib = 'libs',
}

export interface ProjectFolder {
  name: string;
  isDir: boolean;
  folderContent?: ProjectFolder[];
  dirType?: FolderType;
  fileType?: FileType;
}

export const folderTypes = Object.values(FolderType);
export const fileTypes = Object.values(FileType);
