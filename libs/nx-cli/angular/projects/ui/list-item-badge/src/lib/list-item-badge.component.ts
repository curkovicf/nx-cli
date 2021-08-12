import { Component, Input, OnInit } from '@angular/core';
import { NxProjectType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

@Component({
  selector: 'dev-workspace-list-item-badge',
  templateUrl: './list-item-badge.component.html',
  styleUrls: ['./list-item-badge.component.scss']
})
export class ListItemBadgeComponent implements OnInit {
  @Input()
  set projectType(libraryType: NxProjectType | undefined) {
    this.initAccentColor(libraryType)
  };

  public badgeType: NxProjectType | undefined;
  public accentColor = '';

  ngOnInit(): void {
    if (!this.badgeType) {
      this.accentColor = 'red';
    }
  }

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
        break;
      default:
        this.accentColor = 'black';
    }

    this.badgeType = projectType;
  }
}
