import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuoteConversionReportService {
  constructor(private http: HttpClient) { }
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  rootUrl = localStorage.getItem('reportsUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  getPaymentData(fromDate: any, toDate:any,) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.nreportUrl + 'reports/qoute_payment?' + form, { headers: this.getHeaders() });
  }

  lostCountDetails(fromDate: any, toDate:any,) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.nreportUrl + 'reports/lost_qoute?' + form, { headers: this.getHeaders() });
  }  
}
