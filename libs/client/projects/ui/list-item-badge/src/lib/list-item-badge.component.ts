import { Component, Input, OnInit } from '@angular/core';
import { NxProjectType } from '@nx-cli/client/projects/data-access/store';

@Component({
  selector: 'dev-workspace-list-item-badge',
  templateUrl: './list-item-badge.component.html',
  styleUrls: ['./list-item-badge.component.scss'],
})
export class ListItemBadgeComponent {
  @Input()
  set projectType(libraryType: NxProjectType | undefined) {
    this.initAccentColor(libraryType);
  }

  public badgeType: NxProjectType | undefined;
  public accentColor = '';

  private initAccentColor(projectType: NxProjectType | undefined): void {
    switch (projectType) {
      case NxProjectType.data:
        this.accentColor = 'skyblue';
        break;
      case NxProjectType.util:
        this.accentColor = 'grey';
        break;
      case NxProjectType.feature:
        this.accentColor = 'orange';
        break;
      case NxProjectType.ui:
        this.accentColor = 'yellow';
        break;
      case NxProjectType.shell:
        this.accentColor = 'gray';
        break;
      case NxProjectType.app:
        this.accentColor = 'red';
        break;
      default:
        this.accentColor = 'black';
    }

    this.badgeType = projectType;
  }
}
