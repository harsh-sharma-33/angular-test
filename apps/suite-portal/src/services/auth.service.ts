import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    // You could check for a token in localStorage or check with a backend service
    const token = localStorage.getItem('authToken');
    return !!token; // Returns true if a token is present
  }

  // Store token after login
  login(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Clear token on logout
  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['']);
  }
}
