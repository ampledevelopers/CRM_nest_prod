import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairdeviationfraudreportService {
  rootUrl = localStorage.getItem('reportsUrl');
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
  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
}

  getSitetypes() {
    const form = 'user_id=' + localStorage.getItem('userId');
      return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
  }

  getRepairdeviatiobfraudReport(fromDate: string, toDate: string, branchId: string, reportType: string, sitetype: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId +
   '&reportType=' + reportType + '&sitetype=' + sitetype + '&group_id=' + localStorage.getItem('userRole');
      return this.http.post(this.rootUrl + 'api/reports/repair_deviation_fraud_report', form, {headers : this.reqHeader});
    }
}
