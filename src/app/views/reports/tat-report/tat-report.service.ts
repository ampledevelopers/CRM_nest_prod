import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TatReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  constructor(private http: HttpClient) {
  }

  getTicketReport(branchId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&branch_id=' + branchId;
    return this.http.post('http://portal.icareservice.co.in/api/reports/get_tat_ticket_datewise', form, {headers : this.reqHeader}).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError(() => 'Something went wrong!' );
           })
        );
  }

  getBinReport(branchId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&branch_id=' + branchId;
    return this.http.post('http://portal.icareservice.co.in/api/reports/get_tat_bin_datewise', form, {headers : this.reqHeader}).
        pipe(
           map((data: any) => {
             return data;
           }), catchError( error => {
             return throwError(() => 'Something went wrong!' );
           })
        );
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options', form, {headers : this.reqHeader});
  }

}
