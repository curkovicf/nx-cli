import {Routes} from '@angular/router';
import {LayoutComponent} from './layout/layout.component';

/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

export const shellRoutes: Routes = [
  {
    path: '',
    redirectTo: 'projects',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: async () =>
          (await import('@nx-cli/client/projects/feature/shell')).ProjectsShellModule,
      },
    ],
  },
];
