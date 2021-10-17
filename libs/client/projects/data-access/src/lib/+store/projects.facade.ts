import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ProjectsState } from './projects.reducer';
import { Project, ProjectsIpcDtos } from '@nx-cli/shared/data-access/models';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';


@Injectable({
  providedIn: 'root'
})
export class ProjectsFacade {
  public projects$ = this.store.pipe(select(ProjectsSelectors.getProjects));
  public selectedProject$ = this.store.pipe(select(ProjectsSelectors.getSelectedProject));

  constructor(private store: Store<ProjectsState>) {}

  public addProjects(projects: Project[]): void {
    this.store.dispatch(ProjectsActions.addProjects({ projects }));
  }

  public selectProject(selectedProject: Project): void {
    this.store.dispatch(ProjectsActions.setSelectedProject({ selectedProject }));
  }

  public resetProjects(): void {
    this.store.dispatch(ProjectsActions.addProjects({ projects: [] }));
  }

  public removeTag(data: ProjectsIpcDtos.RemoveTag) {
    this.store.dispatch(ProjectsActions.removeTag({ projectName: data.selectedProject, tagToDelete: data.tagToDelete }));
  }
}
