import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeLayoutComponent } from '@dev-workspace/nx-cli/angular/shell/ui/home-layout';
import { ShellLayoutComponent } from './shell-layout.component';
import { TopNavModule } from '@dev-workspace/nx-cli/angular/shell/ui/top-nav';

/*  How to redirect to the child route  */
// https://stackoverflow.com/questions/42874859/angular-2-routing-redirect-to-with-child-routes

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '',
    component: ShellLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeLayoutComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), TopNavModule],
  declarations: [ShellLayoutComponent]
})
export class ShellRoutingModule {}
