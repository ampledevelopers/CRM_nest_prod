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

  constructor(private http: HttpClient) {
  }

  getYears() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_years', form, {headers : this.reqHeader});
}

  getAgentReport(year: string, month: string, reportType: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  '&year=' + year + '&month=' + month + '&reportType=' + reportType ;
      return this.http.post(this.rootUrl + 'api/reports/agent_report', form, {headers : this.reqHeader});
    }
}
