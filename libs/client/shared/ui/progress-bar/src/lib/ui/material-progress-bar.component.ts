import { Component } from '@angular/core';
import { MaterialProgressBarService } from '../service/material-progress-bar.service';

@Component({
  selector: 'dev-workspace-material-progress-bar',
  template: `
    <mat-progress-bar
      *ngIf="progressBarService.isLoading"
      mode="indeterminate"
      color="primary"
    ></mat-progress-bar>
  `,
})
export class MaterialProgressBarComponent {
  constructor(public progressBarService: MaterialProgressBarService) {}
}
