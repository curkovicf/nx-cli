import { AngularComponent } from '@nx-cli/client/projects/data-access';

export function findDeclaredComponents(angularModuleTxt: string): AngularComponent[] {
  const angularComponents: AngularComponent[] = [];
  const angularModuleSplit = angularModuleTxt.split(/\r?\n/); //  This regex supports Windows & Unix systems

  let isDeclarations = false;
  angularModuleSplit.forEach((line) => {
    if (line.includes('declarations')) {
      //  Declarations start
      isDeclarations = true;
    }

    if (isDeclarations) {
      //  Grab components in array
      const trimmed = line.replace('declarations', '').replace(':', '').replace('[', '').replace(']', '').replace(',', '').trim();

      //  Handle edge cases like declarations: [Comp,Comp], declarations: [Comp, /nComp] etc.
      const arrSplit = trimmed.split(/[ ,]+/);

      if (arrSplit.length > 0) {
        arrSplit.forEach((angularComponentTxt) => {
          if (angularComponentTxt) {
            angularComponents.push({ className: angularComponentTxt, path: '', fileName: '' });
          }
        });
      }
    }

    if (line.includes(']') && isDeclarations) {
      //  Declarations end
      isDeclarations = false;
    }
  });

  return angularComponents;
}
