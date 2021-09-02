import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientShellRoutes } from './client-shell.routes';
import { WorkspacesModule } from '@nx-cli/client/workspaces/data-access';
import { StoreModule } from '@ngrx/store';
import { APP_GLOBALS_STATE, appGlobalsReducer, AppGlobalsFacade } from '@nx-cli/client/shell/data-access';


@NgModule({
  imports: [CommonModule, RouterModule.forRoot(clientShellRoutes), WorkspacesModule, StoreModule.forFeature(APP_GLOBALS_STATE, appGlobalsReducer)],
  providers: [AppGlobalsFacade]
})
export class ClientShellModule {}
