import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'sp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'suite-portal';
  constructor(public authService: AuthService) {}
}
