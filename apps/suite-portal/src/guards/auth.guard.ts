import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Your custom authentication service
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean | Observable<boolean> {
    if (this.authService.isAuthenticated()) {
      return true; // If the user is authenticated, allow access
    } else {
      this.router.navigate(['/admin']); // If not authenticated, redirect to login page
      return false; // Prevent access
    }
  }
}
