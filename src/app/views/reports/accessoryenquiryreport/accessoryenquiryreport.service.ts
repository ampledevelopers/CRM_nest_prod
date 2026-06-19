import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessoryenquiryreportService {
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
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

  getAccessoryEnquiryReport(fromDate: string, toDate: string, branchId: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
    '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&group_id=' + localStorage.getItem('userRole');
    return this.http.post(this.nreportUrl + 'reports/accessory_enquiry_report', form, {headers : this.getHeaders()});
  }

}
