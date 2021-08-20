export function getProjectName(pwd: string): string {
  const splitPath = pwd.split('/');
  return splitPath[splitPath.length - 1];
}
