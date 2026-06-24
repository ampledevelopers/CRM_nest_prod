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
    const form =
      '&user_id=' + localStorage.getItem('userId') +
      '&branch_code=' + (localStorage.getItem('branchCode') || '');
    return this.http.post(
      this.nreportUrl + 'reports/active_consignment_data', form,
      { headers: this.getHeaders() }
    );
  }
}
