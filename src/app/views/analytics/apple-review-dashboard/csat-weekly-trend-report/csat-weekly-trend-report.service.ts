import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CsatWeeklyTrendReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }
  CsatWeeklyData(financialYear:any, month:any, week:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&month=' + month + '&week=' + week + '&financial_year=' + financialYear;
    return this.http.get(this.rootUrl + 'api/analytics/csat_weekly_trend?'+ form, {headers : this.reqHeader});
  }

 
}
