import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairApprovalDashboardService {
  rootUrl = localStorage.getItem('rootUrl');
  reportsUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) { }

  getL2Data(fromDate: any, toDate: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.reportsUrl + 'api/analytics/get_l2_report?'+ form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }
}
