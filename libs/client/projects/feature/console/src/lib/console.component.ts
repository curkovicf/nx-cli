import { Component } from '@angular/core';
import { ProjectsStore } from '@nx-cli/client/projects/data-access';
import { WorkspacesFacade } from '@nx-cli/client/workspaces/data-access';
import { take, tap } from 'rxjs/operators';
import { UtilLocalStorageService } from '@nx-cli/client/shared/util';

@Component({
  selector: 'nx-cli-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss']
})
export class ConsoleComponent {
  constructor(
    public projectsStore: ProjectsStore,
    private localStorageService: UtilLocalStorageService,
    public workspacesFacade: WorkspacesFacade,
  ) {}

  clearConsole() {
    this.workspacesFacade.selectedWorkspace$.pipe(tap(w => this.workspacesFacade.clearConsole(w?.path)), take(1)).subscribe();
    this.localStorageService.save();
  }
}
