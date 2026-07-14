import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DayReportService {
  rootUrl = localStorage.getItem('rootUrl');
  reportUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
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
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  dayReport() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nreportUrl + 'analytics/day_report?' + form, {headers : this.getHeaders()});
  }

  exportDayReport(fromDate:any,toDate:any,productFamily:any) {
    const form =  '&user_id=' + localStorage.getItem('userId') + '&product_family=' + productFamily
   + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.nreportUrl + 'analytics/export_day_report?' + form, {headers : this.getHeaders()});
  }

}
