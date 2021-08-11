import { Component } from '@angular/core';

@Component({
  selector: 'dev-workspace-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  nav_links: {link: string, text: string}[] = [
    {link: '/home', text: 'home'},
    {link: '/npm', text: 'modules'},
  ];
}
