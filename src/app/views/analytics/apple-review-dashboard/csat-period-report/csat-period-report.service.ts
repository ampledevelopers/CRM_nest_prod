import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsatPeriodReportService {
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
  getCsatData(financialYear:any, month:any, week:any,pervFinancialYear:any,prevMonth:any,prevWeek:any) {
    const form = '&user_id=' + '1911' + '&financial_year=' + financialYear
    + '&month=' + month + '&week=' + week + '&prev_financial_year=' + pervFinancialYear + '&prev_month=' + prevMonth + '&prev_week=' + prevWeek;
    return this.http.get(this.nreportUrl + 'analytics/csat_report1?'+ form, {headers : this.getHeaders()});
  }
}
