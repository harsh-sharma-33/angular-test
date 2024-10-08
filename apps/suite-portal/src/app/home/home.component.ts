import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ALL_SERVICE_TYPES } from '@suiteportal/api-interfaces';

@Component({
  selector: 'pm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  serviceTypes = ALL_SERVICE_TYPES;
  maintenanceForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {
    this.initForm();
  }

  initForm() {
    this.maintenanceForm = this.fb.group({
      unitNumber: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      serviceType: ['', Validators.required],
      summary: ['', Validators.required],
      details: [''],
    });
  }
  ngOnInit(): void {
    //
    console.log(this.maintenanceForm.controls);
  }

  onSubmit() {
    if (this.maintenanceForm.valid) {
      // Handle form submission
      console.log(this.maintenanceForm.value);
      this.http
        .post('/api/maintenance-requests/', this.maintenanceForm.value)
        .subscribe(
          () => {
            this.snackBar.open('Request added Successfully!');
            this.resetForm();
          },
          () => {
            this.snackBar.open('something went wrong');
          }
        );
    } else {
      // Handle form errors
    }
  }

  resetForm() {
    this.maintenanceForm.reset();
    Object.keys(this.maintenanceForm.controls).map((control) => {
      this.maintenanceForm.controls[control].setErrors(null);
    });
  }
}
