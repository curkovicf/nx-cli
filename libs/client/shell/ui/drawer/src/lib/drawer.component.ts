import { Component } from '@angular/core';
import { drawerAnimation } from '@nx-cli/client/shell/ui/drawer';

@Component({
  selector: 'nx-cli-drawer',
  template: `
    <ng-content select='.drawer-content'></ng-content>
  `,
  styleUrls: ['./drawer.component.scss'],
  animations: [drawerAnimation]
})
export class DrawerComponent {}
