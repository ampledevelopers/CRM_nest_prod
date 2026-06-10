import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsatPeriodReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }
  getCsatData(financialYear:any, month:any, week:any,pervFinancialYear:any,prevMonth:any,prevWeek:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + '1911' + '&financial_year=' + financialYear
    + '&month=' + month + '&week=' + week + '&prev_financial_year=' + pervFinancialYear + '&prev_month=' + prevMonth + '&prev_week=' + prevWeek;
    return this.http.get(this.rootUrl + 'api/analytics/csat_report1?'+ form, {headers : this.reqHeader});
  }
}
