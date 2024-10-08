import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.scss'],
})
export class AdminLoginForm implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Change to Validators.email if it's email based
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/requests']);
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .post('/api/admin-requests/login', this.loginForm.value)
        .subscribe(
          (data: any) => {
            this.authService.login(data.token);
            this.router.navigate(['/requests']);
          },

          (err) => {
            this.snackbar.open(err.error.message);
          }
        );
    } else {
      console.log('Form is invalid');
    }
  }
}
