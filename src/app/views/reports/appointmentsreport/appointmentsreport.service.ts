import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsreportService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }

  getReservation() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&mobile=' + '' + '&email=' + '' + '&branch_code=' + '' + '&user_id=' + '1911';
    return this.http.get( this.nestUrl + 'reservation/get?'+ form, {headers : this.getHeaders()});
  }

  getReservationReport(range: any, productFamily: any, status: any, appointType: any, fromDate: any, toDate: any ) {
    const form = '&branch_code=' + '&date=' + range + '&product_code=' + productFamily + '&status=' + status + '&appoint_type=' + appointType + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get( this.nreportUrl + 'reports/reservation_report?'+ form, {headers : this.getHeaders()});
  }
}
