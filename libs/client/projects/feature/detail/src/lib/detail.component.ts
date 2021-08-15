import { Component } from '@angular/core';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { EventsProxyService } from '@nx-cli/client/shared/util/ipc-events-proxy';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import { MatDialog } from '@angular/material/dialog';
import { GenerateComponentFormComponent } from '@nx-cli/client/projects/ui/generate-component-form';
import { take } from 'rxjs/operators';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(
    public projectsStore: ProjectsStore,
    private eventsProxyService: EventsProxyService,
    public dialog: MatDialog
  ) {
  }

  public generateComponent(project: Project): void {
    combineLatest([
      this.dialog.open(GenerateComponentFormComponent).afterClosed(),
      this.projectsStore.selectedNxProject$
    ])
      .pipe(take(1))
      .subscribe(([data, selectedNxProject]) => {
        const generateComponentDto: IpcEventDtos.GenerateComponentDto = {
          rootPath: selectedNxProject?.path,
          projectNxName: project.nameInNxJson,
          ...data
        };

        this.eventsProxyService.generateComponent(generateComponentDto);
      });
  }
}
