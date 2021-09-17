import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { projectsRoutes } from './projects-shell.routes';
import { ListModule } from '@nx-cli/client/projects/feature/list';
import { DetailModule } from '@nx-cli/client/projects/feature/detail';
import { TagsModule } from '@nx-cli/client/projects/ui/tags';
import { ConsoleModule } from '@nx-cli/client/projects/feature/console';
import { ProjectsLayoutComponent } from './layout/projects-layout.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectsEffects, PROJECTS_FEATURE_KEY, projectsReducer } from '@nx-cli/client/projects/data-access';

@NgModule({
  imports: [
    RouterModule.forChild(projectsRoutes),
    StoreModule.forFeature(PROJECTS_FEATURE_KEY, projectsReducer),
    EffectsModule.forFeature([ProjectsEffects]),
    CommonModule,
    CommonModule,
    ListModule,
    DetailModule,
    TagsModule,
    ConsoleModule
  ],
  declarations: [ProjectsLayoutComponent]
})
export class ProjectsShellModule {
}
