import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { throwError } from 'rxjs';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

getCalltypeAnalytics(company_id: any, fromDate: any, toDate: any) {
const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
'&compId=' + company_id + '&fromDate=' + fromDate + '&toDate=' + toDate ;
  return this.http.post(this.rootUrl + 'api/charts/calltype_analytics', form, {headers : this.reqHeader});
}

getCompanies() {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  ;
    return this.http.post(this.rootUrl + 'api/tickets/get_companies', form, {headers : this.reqHeader});
}
}
