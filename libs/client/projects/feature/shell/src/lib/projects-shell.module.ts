import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectsRoutes } from './projects-shell.routes';

@NgModule({
  imports: [RouterModule.forChild(projectsRoutes), CommonModule]
})
export class ProjectsShellModule {}
