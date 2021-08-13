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
        this.accentColor = '#3498DB';
        break;
      case NxProjectType.util:
        this.accentColor = '#95A5A6';
        break;
      case NxProjectType.feature:
        this.accentColor = '#E67E22';
        break;
      case NxProjectType.ui:
        this.accentColor = '#F1C40F';
        break;
      case NxProjectType.shell:
        this.accentColor = '#7F8C8D';
        break;
      case NxProjectType.app:
        this.accentColor = '#D35400';
        break;
      default:
        this.accentColor = 'black';
    }

    this.badgeType = projectType;
  }
}
