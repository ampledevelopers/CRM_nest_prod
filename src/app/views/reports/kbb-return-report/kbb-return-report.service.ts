import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KbbReturnReportService {
  rootUrl = localStorage.getItem('rootUrl');
  reportUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')   + '&user_id=' + '1911';
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  getKBBreport(branch: any, status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&return_status=' + status + '&branch_code=' + branch;
    return this.http.get(this.reportUrl + 'api/analytics/kbb_pending?' + form, {headers : this.reqHeader});
  }
}
