import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectsLayoutComponent } from '@nx-cli/client/shell/ui/projects-layout';
import { ShellLayoutComponent } from './shell-layout.component';
import { TopNavModule } from '@nx-cli/client/shell/ui/top-nav';
import { ChipsBarModule } from '@nx-cli/client/shell/ui/chips-bar';
import { CommonModule } from '@angular/common';
import { DrawerModule } from '@nx-cli/client/shell/ui/drawer';
import { AddNxProjectFormModule } from '@nx-cli/client/projects/ui/add-nx-project-form';

/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

const routes: Routes = [
  {
    path: '',
    redirectTo: '/projects',
    pathMatch: 'full',
  },
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: 'projects',
        component: ProjectsLayoutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TopNavModule, ChipsBarModule, CommonModule, DrawerModule, AddNxProjectFormModule],
  declarations: [ShellLayoutComponent],
})
export class ShellRoutingModule {}
