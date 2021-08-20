export function isProject(file: string, files: string[]): boolean {
  return (
    file.toString() === '.eslintrc.json' ||
    file.toString() === 'tsconfig.json' ||
    (file.toString() === 'tsconfig.spec.json' && files.includes('src'))
  );
}
