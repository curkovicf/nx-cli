export type FileType =
  'typescript'
  | 'styles'
  | 'template'
  | 'ng-component'
  | 'ng-service'
  | 'ng-module'
  | 'ng-guard'
  | 'tsconfig'
  | 'eslint'
  | 'readme'
  | 'unknown'
  | 'ng-interceptor';

export interface ProjectFile {
  name: string;
  type: FileType;
}

export type FolderType =
  'controller'
  | 'service'
  | 'guard'
  | 'interceptors'
  | 'ui'
  | 'view'
  | 'data'
  | 'core'
  | 'domain'
  | 'test'
  | 'style'
  | 'util'
  | 'feature'
  | 'model'
  | 'unknown'
  | 'api';

export interface ProjectFolder {
  name: string;
  type: FolderType;
  folderContent: (ProjectFolder | ProjectFile)[];
}
