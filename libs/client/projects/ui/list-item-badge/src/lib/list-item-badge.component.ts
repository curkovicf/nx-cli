import { Component, Input, OnInit } from '@angular/core';
import { ProjectType } from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'dev-workspace-list-item-badge',
  templateUrl: './list-item-badge.component.html',
  styleUrls: ['./list-item-badge.component.scss'],
})
export class ListItemBadgeComponent {
  @Input()
  set projectType(libraryType: ProjectType | undefined) {
    this.initAccentColor(libraryType);
  }

  public badgeType: ProjectType | undefined;
  public accentColor = '';

  private initAccentColor(projectType: ProjectType | undefined): void {
    switch (projectType) {
      case ProjectType.data:
        this.accentColor = '#3498DB';
        break;
      case ProjectType.util:
        this.accentColor = '#95A5A6';
        break;
      case ProjectType.feature:
        this.accentColor = '#E67E22';
        break;
      case ProjectType.ui:
        this.accentColor = '#F1C40F';
        break;
      case ProjectType.shell:
        this.accentColor = '#7F8C8D';
        break;
      case ProjectType.app:
        this.accentColor = '#D35400';
        break;
      default:
        this.accentColor = 'black';
    }

    this.badgeType = projectType;
  }
}
