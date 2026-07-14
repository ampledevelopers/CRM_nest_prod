import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenDashboardService {
  reportUrl = localStorage.getItem('reportsUrl');
  rootUrl = localStorage.getItem('rootUrl');
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
  constructor(private http: HttpClient) { }

  getTokenDashboard() {
    const form =  '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nreportUrl + 'analytics/token_dashboard', form, {headers : this.getHeaders()});
  }

  getTokenData(fromDate: any, toDate: any) {
    const form = '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate ;
      return this.http.post(this.nreportUrl + 'analytics/token_details', form, {headers : this.getHeaders()});
    }
}
