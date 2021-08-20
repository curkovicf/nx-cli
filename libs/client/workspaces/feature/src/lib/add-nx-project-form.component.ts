import { Component, Output, EventEmitter, Input } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ElectronService } from 'ngx-electron';
import { Observable, of, timer } from 'rxjs';
import { NxProject } from '@nx-cli/client/projects/data-access';
import { IpcEvents } from '@nx-cli/shared/data/ipc-events';
import { IpcResponseData } from '@nx-cli/app/shared/util';

@Component({
  selector: 'nx-cli-add-nx-project-form',
  templateUrl: './add-nx-project-form.component.html',
  styleUrls: ['./add-nx-project-form.component.scss'],
})
export class AddNxProjectFormComponent {
  @Input()
  nxProjects: NxProject[];

  @Output()
  onsubmit: EventEmitter<NxProject> = new EventEmitter<NxProject>();

  @Output()
  oncancel: EventEmitter<void> = new EventEmitter<void>();

  public form: FormGroup;
  private nxProject: NxProject = { path: '', name: '' };

  constructor(private electronService: ElectronService) {
    this.form = new FormGroup({
      path: new FormControl(null, [Validators.required], this.validatePath.bind(this)),
    });
  }

  public onSubmit(): void {
    this.onsubmit.emit(this.nxProject);
  }

  public onCancel() {
    this.oncancel.emit();
  }

  /* TODO: Refactor */
  validatePath(control: AbstractControl): Observable<ValidationErrors | null> {
    return timer(1500).pipe(
      switchMap(() => {
        return of(this.electronService.ipcRenderer.sendSync(IpcEvents.validateWorkspacePath.fromAngular, control.value)).pipe(
          map((response: IpcResponseData<NxProject>): ValidationErrors | null => {
            if (response.data) {
              this.nxProject = response.data;

              for (let i = 0; i < this.nxProjects.length; i++) {
                const currProject = this.nxProjects[i];

                if (currProject.name === this.nxProject.name && currProject.path === this.nxProject.path) {
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
