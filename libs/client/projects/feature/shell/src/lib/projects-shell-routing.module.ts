import { NgModule } from '@angular/core';
import { ProjectsLayoutComponent } from '@nx-cli/client/projects/ui/layout';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ProjectsLayoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule]
})
export class ProjectsShellRoutingModule {}
