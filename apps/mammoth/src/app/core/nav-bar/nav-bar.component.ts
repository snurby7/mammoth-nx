import { Component } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'mammoth-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  constructor(public authService: AuthService) {}
}
