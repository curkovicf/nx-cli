export function parsePath(path: string): string {
  return path.replace(/\\/g, "/");
}
