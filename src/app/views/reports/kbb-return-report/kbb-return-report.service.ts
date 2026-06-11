import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KbbReturnReportService {
  rootUrl = localStorage.getItem('rootUrl');
  reportUrl = localStorage.getItem('reportsUrl');
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

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  getKBBreport(branch: any, status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&return_status=' + status + '&branch_code=' + branch;
    return this.http.get(this.reportUrl + 'api/analytics/kbb_pending?' + form, {headers : this.reqHeader});
  }
}
