import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenulogreportService {
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

  getMenuLogReport(fromDate: string, toDate: string, menuName: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&menu_name=' + menuName ;
      return this.http.post(this.nreportUrl + 'reports/menu_log_report', form, {headers : this.getHeaders()});
    }

  }
