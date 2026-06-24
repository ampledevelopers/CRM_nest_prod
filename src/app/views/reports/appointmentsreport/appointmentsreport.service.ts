import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsreportService {

  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('reportsUrl');

  getReservation() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&mobile=' + '' + '&email=' + '' + '&branch_code=' + '' + '&user_id=' + '1911';
    return this.http.get( this.rootUrl + 'api/reservation/get?'+ form, {headers : this.reqHeader});
  }

  getReservationReport(range: any, productFamily: any, status: any, appointType: any, fromDate: any, toDate: any ) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + '&date=' + range + '&product_code=' + productFamily + '&status=' + status + '&appoint_type=' + appointType + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get( this.rootUrl + 'api/reports/reservation_report?'+ form, {headers : this.reqHeader});
  }
}
