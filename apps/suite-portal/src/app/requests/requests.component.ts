import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaintenanceRequest } from '@suiteportal/api-interfaces';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.scss'],
})
export class Requests implements OnInit {
  constructor(private http: HttpClient, private snackbar: MatSnackBar) {}
  dataSource: IResponse[];
  ngOnInit(): void {
    this.http.get('/api/maintenance-requests').subscribe(
      (data: IResponse[]) => {
        if (!data && !data.length) {
          this.snackbar.open('No Data Found');
        }
        this.dataSource = data;
      },

      (err) => {
        this.snackbar.open(err.error.message);
      }
    );
  }

  displayedColumns: string[] = [
    'id',
    'unitNumber',
    'name',
    'email',
    'serviceType',
    'summary',
    'details',
    'submittedAt',
    'action',
  ];

  // Remove row from the dataSource
  removeRequest(id: string) {
    this.http.patch(`/api/maintenance-requests/close/${id}`, {}).subscribe(
      (data: IResponse[]) => {
        if (!data && !data.length) {
          this.snackbar.open('No Data Found');
        }
        this.dataSource = data;
      },

      (err) => {
        this.snackbar.open(err.error.message);
      }
    );
  }
}

export interface IResponse extends MaintenanceRequest {
  id: string;
}
