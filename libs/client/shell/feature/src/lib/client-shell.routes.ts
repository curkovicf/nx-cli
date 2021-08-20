import { Routes } from '@angular/router';
import { ClientLayoutComponent } from '@nx-cli/client/shell/ui/layout';

/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

export const clientShellRoutes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: 'projects',
        loadChildren: async () => (await import('@nx-cli/client/projects/feature/shell')).ProjectsShellModule
      }
    ]
  }
];
