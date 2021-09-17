import { Component } from '@angular/core';

@Component({
  selector: 'nx-cli-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
})
export class TopNavComponent {
  nav_links: { link: string; text: string }[] = [
    { link: '/projects', text: 'projects' },
  ];
}
