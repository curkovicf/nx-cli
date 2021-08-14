import { Component, OnInit } from '@angular/core';

import {
  Project,
  ProjectsStore,
} from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(public projectsStore: ProjectsStore) {}

  public ngOnInit() {
    this.projectsStore.getAllProjects();
  }

  public refresh(): void {
    this.projectsStore.getAllProjects();
  }

  public triggerSearch(keyword: string): void {
    this.projectsStore.filterProjects(keyword);
  }

  public onSelectProject(project: Project): void {
    this.projectsStore.selectProject(project);
  }
}
