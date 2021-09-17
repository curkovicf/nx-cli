import { Component } from '@angular/core';
import { DetailStore } from '../../../../data-access/src/lib/viewmodels/detail.store';

@Component({
  selector: 'nx-cli-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailStore]
})
export class DetailComponent {
  constructor(public detailVmStore: DetailStore) {}
}
