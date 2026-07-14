import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuarterlyreportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
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

   getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

  getYears() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nreportUrl + 'reports/get_years', form, {headers : this.getHeaders()});
}

getQuarterlyReport(quarter: string, year: string, branchId: string) {
  const form = '&user_id=' + localStorage.getItem('userId') +
'&quarter=' + quarter + '&year=' + year + '&branchId=' + branchId ;
    return this.http.post(this.nreportUrl + 'reports/quarterly_report', form, {headers : this.getHeaders()});
  }
}
