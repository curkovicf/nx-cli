import {Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {ProjectsState} from './projects.reducer';

import * as ProjectsActions from './projects.actions';
import * as ProjectsSelectors from './projects.selectors';
import { Project } from 'nx-cli-osfn/lib/projects/models/project.model';
import { RemoveTagDto } from 'nx-cli-osfn/lib/projects/dtos/remove-tag.dto';
import { AddTagResult } from 'nx-cli-osfn/lib/projects/dtos/add-tag-result.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectsFacade {
  public projects$ = this.store.pipe(select(ProjectsSelectors.getProjects));

  constructor(private store: Store<ProjectsState>) {}

  public addProjects(projects: Project[]): void {
    this.store.dispatch(ProjectsActions.addProjects({projects}));
  }

  public resetProjects(): void {
    this.store.dispatch(ProjectsActions.addProjects({projects: []}));
  }

  public removeTag(dto: RemoveTagDto) {
    this.store.dispatch(
      ProjectsActions.removeTag({
        projectName: dto.selectedProject,
        tagToDelete: dto.tagToDelete,
      }),
    );
  }

  public addTags(dto: AddTagResult): void {
    return this.store.dispatch(ProjectsActions.addTags({dto}));
  }
}
