import { Component, Output, EventEmitter, Input } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { IpcResponseData } from '@nx-cli/app/shared/util';
import { WorkspaceIpcApiService } from '@nx-cli/shared/data-access/ipc-api';
import { Workspace } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'nx-cli-add-nx-project-form',
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
  private workspace: Workspace = { path: '', name: '', consoleLogs: [] };

  constructor(private workspaceIpcApiService: WorkspaceIpcApiService) {
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
        return this.workspaceIpcApiService.validatePath(control.value)
          .pipe(
            map((response: IpcResponseData<Workspace>): ValidationErrors | null => {
              if (response.data) {
                this.workspace = response.data;

                console.log(response);
                //  TODO: Remove quickfix
                if (!this.workspaces) { return null; }

                for (let i = 0; i < this.workspaces.length; i++) {
                  const currProject = this.workspaces[i];

                  if (currProject.name === this.workspace.name && currProject.path === this.workspace.path) {
                    return { isNxProject: { valid: false } };
                  }
                }

                return null;
              } else {
                return { isNxProject: { valid: false } };
              }
            }) //  End map
          );
      }) //  End switchMap
    );
  }
}
