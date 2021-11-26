import {Component} from '@angular/core';
import {WorkspacesFacade} from '@nx-cli/client/workspaces/data-access';
import {first, tap} from 'rxjs/operators';
import {UtilLocalStorageService} from '@nx-cli/client/shared/util';

@Component({
  selector: 'nx-cli-console',
  templateUrl: './console.component.html',
  styleUrls: ['./console.component.scss'],
})
export class ConsoleComponent {
  constructor(
    private localStorageService: UtilLocalStorageService,
    public workspacesFacade: WorkspacesFacade,
  ) {}

  clearConsole() {
    this.workspacesFacade.selectedWorkspace$
      .pipe(
        first(),
        tap(w => this.workspacesFacade.clearConsole(w?.path)),
      )
      .subscribe(() => this.localStorageService.save());
  }
}
