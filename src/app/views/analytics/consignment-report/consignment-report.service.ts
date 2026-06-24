import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentReportService {
  reportsUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) {}

  getActiveConsignmentReport() {
    const params =
      'X_API_KEY=' + localStorage.getItem('userToken') +
      '&user_id=' + localStorage.getItem('userId') +
      '&branch_code=' + (localStorage.getItem('branchCode') || '');
    return this.http.get(
      this.reportsUrl + 'api/analytics/active_consignment_report?' + params,
      { headers: this.reqHeader }
    );
  }
}
