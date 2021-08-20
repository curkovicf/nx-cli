export function getClassName(txt: string): string {
  const lines = txt.split(/\r?\n/);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.includes('export class')) {
      const split = line.split(' ');
      return split[2];
    }
  }

  return 'ERROR';
}
