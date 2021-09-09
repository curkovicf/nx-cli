export enum FileType {
  typescript = 'typescript',
  styles = 'styles',
  template = 'template',
  component = 'component',
  service = 'service',
  module = 'module',
  guard = 'guard',
  tsconfig = 'tsconfig',
  eslint = 'eslint',
  readme = 'readme',
  unknown = 'unknown',
  interceptor = 'interceptor'
}

export interface ProjectFile {
  name: string;
  type: FileType;
}

export enum FolderType {
  controller = 'controller',
  service = 'service',
  guard = 'guard',
  interceptors = 'interceptors',
  ui = 'ui',
  view = 'view',
  data = 'data',
  core = 'core',
  domain = 'domain',
  test = 'test',
  style = 'style',
  util = 'util',
  feature = 'feature',
  model = 'model',
  unknown = 'unknown',
  api = 'api',
  src = 'src',
  lib = 'lib',
}

export interface ProjectFolder {
  name: string;
  type: FolderType;
  folderContent: (ProjectFolder | ProjectFile)[];
}


export const folderTypes = Object.values(FolderType);
export const fileTypes = Object.values(FileType);
