export function trimToRelativePath(pwd: string, rootPath: string): string {
  return pwd.replace(rootPath, '');
}
