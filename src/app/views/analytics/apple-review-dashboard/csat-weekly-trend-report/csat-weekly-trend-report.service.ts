import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsatWeeklyTrendReportService {
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
  CsatWeeklyData(financialYear:any, month:any, week:any) {
    const form =  '&month=' + month + '&week=' + week + '&financial_year=' + financialYear;
    return this.http.get(this.nreportUrl + 'analytics/csat_weekly_trend?'+ form, {headers : this.getHeaders()});
  }

 
}
