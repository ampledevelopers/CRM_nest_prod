import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcseDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
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

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options', form, {headers : this.getHeaders()});
  }

  getAcseData(date: any) {
    const form = '&user_id=' + localStorage.getItem('userId') + '&date=' + date ;
    return this.http.post(this.nreportUrl + 'analytics/get_acse_data', form, {headers : this.getHeaders()});
}
}
