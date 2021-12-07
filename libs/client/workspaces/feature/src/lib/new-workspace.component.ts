import {Component, Output, EventEmitter, Input} from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {Observable, timer} from 'rxjs';
import {WorkspacesIpcApiService} from '@nx-cli/client/workspaces/data-access';
import {IpcResponses} from '@nx-cli/shared/data-access/models';
import { Workspace } from 'nx-cli-osfn/lib/workspaces/models/workspace.model';

@Component({
  selector: 'nx-cli-new-workspace',
  templateUrl: './new-workspace.component.html',
  styleUrls: ['./new-workspace.component.scss'],
})
export class NewWorkspaceComponent {
  @Input()
  workspaces: Workspace[];

  @Output()
  onsubmit: EventEmitter<Workspace> = new EventEmitter<Workspace>();

  @Output()
  oncancel: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  private workspace: Workspace = {
    path: '',
    name: '',
    consoleLogs: [],
    selectedProject: null,
    tags: [],
    generators: [],
  };

  constructor(private workspacesIpcApiService: WorkspacesIpcApiService) {
    this.form = new FormGroup({
      path: new FormControl(null, [Validators.required], this.validatePath.bind(this)),
    });
  }

  public onSubmit(): void {
    this.onsubmit.emit(this.workspace);
  }

  public onCancel() {
    this.oncancel.emit();
  }

  /* TODO: Refactor */
  validatePath(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(1500).pipe(
      switchMap(() => {
        return this.workspacesIpcApiService.validatePath(control.value).pipe(
          map(
            (
              response: IpcResponses.ResponseWithData<Workspace>,
            ): ValidationErrors | null => {
              if (response.data) {
                this.workspace = response.data;

                //  TODO: Remove quickfix
                if (!this.workspaces) {
                  return null;
                }

                if (this.isWorkspaceDuplicate()) {
                  return {isNxProject: {valid: false}};
                }

                return null;
              } else {
                return {isNxProject: {valid: false}};
              }
            },
          ), //  End map
        );
      }), //  End switchMap
    );
  }

  private isWorkspaceDuplicate(): boolean {
    for (let i = 0; i < this.workspaces.length; i++) {
      const currWorkspace = this.workspaces[i];

      if (
        currWorkspace.name === this.workspace.name &&
        currWorkspace.path === this.workspace.path
      ) {
        return true;
      }
    }

    return false;
  }
}
