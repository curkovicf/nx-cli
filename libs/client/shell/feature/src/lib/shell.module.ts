import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { shellRoutes } from './shell.routes';
import { WorkspacesModule } from '@nx-cli/client/workspaces/data-access';
import { TopNavModule } from '@nx-cli/client/shell/ui/top-nav';
import { ChipsBarModule } from '@nx-cli/client/workspaces/ui/chips-bar';
import { DrawerModule } from '@nx-cli/client/shell/ui/drawer';
import { NewWorkspaceModule } from '@nx-cli/client/workspaces/feature';
import { SideNavModule } from '@nx-cli/client/shell/ui/side-nav';
import { LayoutComponent } from './layout/layout.component';
import { MaterialProgressBarModule } from '@nx-cli/client/shared/ui/progress-bar';
import { PROGRESS_FEATURE_KEY, ProgressBarFacade, progressBarReducer } from '@nx-cli/client/shared/data-access';
import { StoreModule } from '@ngrx/store';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(shellRoutes),
    StoreModule.forFeature(PROGRESS_FEATURE_KEY, progressBarReducer),
    WorkspacesModule,
    TopNavModule,
    ChipsBarModule,
    CommonModule,
    DrawerModule,
    NewWorkspaceModule,
    RouterModule,
    SideNavModule,
    MaterialProgressBarModule,
  ],
  providers: [
    ProgressBarFacade,
  ],
  declarations: [
    LayoutComponent
  ]
})
export class ShellModule {
}
