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
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/get_user_details', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  dayReport() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.reportUrl + 'api/analytics/day_report?' + form, {headers : this.reqHeader});
  }

  exportDayReport(fromDate:any,toDate:any,productFamily:any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&product_family=' + productFamily
   + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.reportUrl + 'api/analytics/export_day_report?' + form, {headers : this.reqHeader});
  }

}
