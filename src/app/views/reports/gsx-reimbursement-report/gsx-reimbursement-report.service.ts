import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { report } from 'process';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GsxReimbursementReportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reportUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
  nestUrl = localStorage.getItem('nestUrl');
  reportsUrl = localStorage.getItem('reportsUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('userToken');
    return new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'No-Auth': 'True',
      'x-api-key': token || ''
    });
  }
  constructor(private http: HttpClient) { }

  getGsxPaidReimburse(period: any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = '&user_id=' + localStorage.getItem('userId') + '&type=' + 'paid' + '&period=' + period;
    return this.http.get(this.nreportUrl + 'reports/labour_reimbursement?' + form, { headers: this.getHeaders() });
  }
  getGsxPendingReimburse(fromDate: any, toDate:any) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = '&user_id=' + localStorage.getItem('userId') + '&type=' + null + '&from_date=' + fromDate + '&to_date=' + toDate;
    return this.http.get(this.nreportUrl + 'reports/labour_reimbursement?' + form, { headers: this.getHeaders() });
  }
  getLabourReport(fromDate: any, toDate: any, branchId: string) {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True' });
    const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_id=' + branchId;
    return this.http.get(this.nreportUrl + 'reports/part_wise_labour_report?' + form, { headers: this.getHeaders() });
  }
  getBranches() {
    const form = '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

}
