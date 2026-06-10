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

  constructor(private http: HttpClient) {
  }

  getMenuLogReport(fromDate: string, toDate: string, menuName: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&menu_name=' + menuName ;
      return this.http.post(this.rootUrl + 'api/reports/menu_log_report', form, {headers : this.reqHeader});
    }

  }
