import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepairsReportTekneService {

  reportsUrl = localStorage.getItem('reportsUrl');
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) {}


  getTekneRepairReport(fromDate: any, toDate: any, branchId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_id=' + branchId;
    return this.http.get(this.rootUrl + 'api/reports/repairs_report_tekne?' + form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.reportsUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  getComponent() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/reports/get_component_issue?' + form, {headers : this.reqHeader});
  }
}
