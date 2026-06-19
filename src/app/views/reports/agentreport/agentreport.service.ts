import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgentreportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
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

  getYears() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nreportUrl + 'reports/get_years', form, {headers : this.getHeaders()});
}

  getAgentReport(year: string, month: string, reportType: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
  '&year=' + year + '&month=' + month + '&reportType=' + reportType ;
      return this.http.post(this.nreportUrl + 'reports/agent_report', form, {headers : this.getHeaders()});
    }
}
