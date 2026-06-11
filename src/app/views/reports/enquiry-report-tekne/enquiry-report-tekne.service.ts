import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnquiryReportTekneService {
  reportsUrl = 'https://api.icareservice.co.in/';
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
    const form = 'X_API_KEY=' + 'UI@PWD#'  + '&user_id=' + '3370';
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
}

  getEnquiryReport(fromDate: string, toDate: string, branchId: string) {
    const form = 'X_API_KEY=' + 'UI@PWD#' + '&user_id=' + '3370' +
  '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId;
      return this.http.post(this.reportsUrl + 'api/reports/tekne_enquiry_report', form, {headers : this.reqHeader});
    }

}
