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
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&branchType=' + 'O' ;
    return this.http.post('https://api.icareservice.co.in/' + 'api/reports/get_companies', form, {headers : this.reqHeader});
}

  getOnsiteReport(fromDate: string, toDate: string, branchId: string, companyId: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&companyId=' + companyId ;
      return this.http.post(this.rootUrl + 'api/reports/onsite_report', form, {headers : this.reqHeader});
  }
}
