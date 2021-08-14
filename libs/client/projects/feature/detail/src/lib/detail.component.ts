import { Component } from '@angular/core';
import { Project, ProjectsStore } from '@nx-cli/client/projects/data-access/store';
import { EventsProxyService } from '@nx-cli/client/shared/util/ipc-events-proxy';
import { IpcEventDtos } from '@nx-cli/shared/data/ipc-events';
import GenerateComponentDto = IpcEventDtos.GenerateComponentDto;

@Component({
  selector: 'dev-workspace-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent {
  constructor(public projectsStore: ProjectsStore,
              private eventsProxyService: EventsProxyService) {}

  public generateComponent(project: Project): void {
    const generateComponentDto: GenerateComponentDto = {
      projectPath: project.path,
      componentName: ''
    };

    //  TODO: Open Dialog

    //  TODO: Get name from dialog

    this.eventsProxyService.generateComponent(generateComponentDto);
  }
}
