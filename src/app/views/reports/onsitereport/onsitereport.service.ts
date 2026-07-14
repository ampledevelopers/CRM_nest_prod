import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnsitereportService {
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
    const form = 'user_id=' + localStorage.getItem('userId') + '&branchType=' + 'O';
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  getCompanies() {
    // const form = '&user_id=' + localStorage.getItem('userId') + '&branchType=' + 'O' ;
    return this.http.post(this.nreportUrl + 'common/get_companies', '', {headers : this.getHeaders()});
}

  getOnsiteReport(fromDate: string, toDate: string, branchId: string, companyId: any) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&companyId=' + companyId ;
      return this.http.post(this.nreportUrl + 'reports/onsite_report', form, {headers : this.getHeaders()});
  }
}
