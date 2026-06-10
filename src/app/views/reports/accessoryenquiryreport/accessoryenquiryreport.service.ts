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

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
}

  getAccessoryEnquiryReport(fromDate: string, toDate: string, branchId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&fromDate=' + fromDate + '&toDate=' + toDate + '&branchId=' + branchId + '&group_id=' + localStorage.getItem('userRole');
    return this.http.post(this.rootUrl + 'api/reports/accessory_enquiry_report', form, {headers : this.reqHeader});
  }

}
