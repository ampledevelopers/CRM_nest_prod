import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteConversionReportService {
  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('reportsUrl');

  getPaymentData(fromDate: any, toDate:any,) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.rootUrl + 'api/reports/qoute_payment?' + form, { headers: reqHeader });
  }

  lostCountDetails(fromDate: any, toDate:any,) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.rootUrl + 'api/reports/lost_qoute?' + form, { headers: reqHeader });
  }  
}
