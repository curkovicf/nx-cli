import { Component, Input, OnInit } from '@angular/core';
import { NxLibraryType } from '@dev-workspace/nx-cli/angular/projects/data-access/projects';

@Component({
  selector: 'dev-workspace-list-item-badge',
  templateUrl: './list-item-badge.component.html',
  styleUrls: ['./list-item-badge.component.scss']
})
export class ListItemBadgeComponent implements OnInit {
  @Input()
  set libraryBadgeType(libraryType: NxLibraryType | undefined) {
    this.initAccentColor(libraryType)
  };

  public badgeType: NxLibraryType | undefined;
  public accentColor = '';

  ngOnInit(): void {
    if (!this.badgeType) {
      this.accentColor = 'red';
    }
  }

  private initAccentColor(projectType: NxLibraryType | undefined): void {
    switch (projectType) {
      case NxLibraryType.data:
        this.accentColor = 'skyblue';
        break;
      case NxLibraryType.util:
        this.accentColor = 'grey';
        break;
      case NxLibraryType.feature:
        this.accentColor = 'orange';
        break;
      case NxLibraryType.ui:
        this.accentColor = 'yellow';
        break;
      case NxLibraryType.shell:
        break;
      default:
        this.accentColor = 'black';
    }

    this.badgeType = projectType;
  }
}
