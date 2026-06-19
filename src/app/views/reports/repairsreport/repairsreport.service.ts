import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepairsreportService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nestUrl = localStorage.getItem('nestUrl');
  nreportUrl = localStorage.getItem('nreportUrl');
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
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

getStatuses(siteType: string) {
    const form = 'user_id=' + localStorage.getItem('userId') +
    '&siteType=' + siteType ;
    return this.http.post(this.nestUrl + 'ticket_edit/get_status', form, {headers : this.getHeaders()});
}

getSitetypes() {
  const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'ticket_edit/get_site_types', form, {headers : this.getHeaders()});
}

  getRepairsReport(fromDate: string, toDate: string, branchId: string, statusId: string, reportType: string, sitetype: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&statusId=' + statusId +
   '&reportType=' + reportType + '&sitetype=' + sitetype + '&group_id=' + localStorage.getItem('userRole');
      return this.http.post(this.nreportUrl + 'reports/repairs_report', form, {headers : this.getHeaders()});
    }
  }
