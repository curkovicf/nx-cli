import {Component} from '@angular/core';
import {DetailStore} from '@nx-cli/client/projects/data-access';

@Component({
  selector: 'nx-cli-project-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  providers: [DetailStore],
})
export class DetailComponent {
  constructor(public detailVmStore: DetailStore) {}
}
