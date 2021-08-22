import { Component } from '@angular/core';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access';
import { MatDialog } from '@angular/material/dialog';
import { NewComponentComponent } from '@nx-cli/client/projects/ui/new-component-form';
import { tap } from 'rxjs/operators';
import { NewServiceFormComponent } from '@nx-cli/client/projects/ui/new-service-form';
import {
  SingleInputFormComponent,
  SingleInputFormComponentData
} from '@nx-cli/client/shared/ui/single-input-form-dialog';
import { WorkspacesStore } from '@nx-cli/client/workspaces/data-access';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: ProjectsStore,
    public workspacesStore: WorkspacesStore,
    private dialog: MatDialog,
  ) {}

  public generateComponent(project: Project): void {
    this.dialog.open(NewComponentComponent)
      .afterClosed()
      .pipe(
        tap(data => {
          if (!data) { return; }

          this.projectsStore.generateComponent({ ...data, projectName: project.nameInNxJson });
        })
      ).subscribe();
  }

  public generateService(project: Project): void {
    this.dialog.open(NewServiceFormComponent)
      .afterClosed()
      .pipe(
        tap(data => {
          if (!data) { return; }

          this.projectsStore.generateService({ ...data, projectName: project.nameInNxJson });
        })
      ).subscribe();
  }

  public moveProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Move',
      placeholder: 'Eg. shared/ui',
      title: 'Enter new location'
    };

    this.dialog
      .open(SingleInputFormComponent, {
        data: moveDialogData
      })
      .afterClosed()
      .pipe(
        tap(data => {
          if (!data) { return; }

          this.projectsStore.moveProject({
            projectNameInNxJson: project.nameInNxJson,
            projectName: project.name,
            moveTo: data.value
          });
        })
      ).subscribe();
  }

  public renameProject(project: Project): void {
    const moveDialogData: SingleInputFormComponentData = {
      submitButtonText: 'Rename',
      placeholder: 'Eg. new-name',
      title: 'Enter new name'
    };

    this.dialog
      .open(SingleInputFormComponent, {
        data: moveDialogData
      })
      .afterClosed()
      .pipe(
        tap(data => {
          if (!data) { return; }

          this.projectsStore.renameProject({
            projectNameInNxJson: project.nameInNxJson,
            type: project.type,
            newPath: project.relativePath
              .replace('/libs', '')
              .replace('/apps', '')
              .replace(`${project.name}`, `${data.value}`)
              .substring(1)
              .slice(0, -1)
          });
        })
      ).subscribe();
  }

  public deleteLib(project: Project): void {
    this.projectsStore.deleteProject(project);
  }
}
