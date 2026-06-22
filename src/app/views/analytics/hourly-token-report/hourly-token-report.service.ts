import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HourlyTokenReportService {
  nreportUrl = localStorage.getItem('nreportUrl');
  nestUrl = localStorage.getItem('nestUrl');

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }

  constructor(private http: HttpClient) { }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, { headers: this.getHeaders() });
  }

  getHourlyTokenReport(date: string, branchCode: string) {
    const form = 'user_id=' + localStorage.getItem('userId') +
      '&date=' + date + '&branch_code=' + branchCode;
    return this.http.post(this.nreportUrl + 'reports/hourly_token_report', form, { headers: this.getHeaders() });
  }
}
