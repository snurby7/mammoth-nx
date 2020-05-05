import { Component } from '@angular/core';

@Component({
  selector: 'mammoth-root',
  template: `
    <mammoth-nav-bar></mammoth-nav-bar><router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
