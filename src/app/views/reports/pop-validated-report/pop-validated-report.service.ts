import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PopValidatedReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
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

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, { headers: this.getHeaders() });
  }

  getPopValidatedReport(fromDate: string, toDate: string, branchId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
      '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&group_id=' + localStorage.getItem('userRole');
    return this.http.post(this.nreportUrl + 'reports/ZZ_pop_validated', form, { headers: this.getHeaders() });
  }
}
