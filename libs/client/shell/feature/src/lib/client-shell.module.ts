import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { clientShellRoutes } from './client-shell.routes';
import { WorkspacesModule } from '@nx-cli/client/workspaces/data-access';

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(clientShellRoutes), WorkspacesModule]
})
export class ClientShellModule {}
