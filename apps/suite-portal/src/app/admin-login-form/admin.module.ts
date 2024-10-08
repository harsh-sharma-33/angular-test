import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginForm } from './admin-login-form.component';
import { SharedModule } from '../shared.module';
import { Requests } from '../requests/requests.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  declarations: [AdminLoginForm, Requests],
  exports: [AdminLoginForm, Requests],
})
export class AdminModule {}
