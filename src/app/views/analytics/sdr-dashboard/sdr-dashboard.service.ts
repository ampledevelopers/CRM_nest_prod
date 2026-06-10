import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SdrDashboardService {
  rootUrl = localStorage.getItem('rootUrl');
  reportUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }
  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.reportUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getSdrData(branchCode: any,fromDate: any, toDate: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch=' + branchCode + '&fromDate=' + fromDate + '&toDate=' + toDate;
    return this.http.get(this.reportUrl + 'api/analytics/sdr_report?'+ form, {headers : this.reqHeader});
  }

}
