import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TechnicianPerformanceService {
  reportUrl = localStorage.getItem('reportsUrl');
  rootUrl = localStorage.getItem('rootUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getPerformanceData(fromDate: any, toDate: any, siteTypeId: any, techId: any, branchCode: any, productFamily: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&from_date=' + fromDate + '&to_date=' + toDate + '&site_type_id=' + siteTypeId + '&technician_id=' + techId + '&product_family=' + productFamily + '&branch_code=' + branchCode;
    return this.http.get(this.reportUrl + 'api/analytics/technician_performance?'+ form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/common/get_user_details', form, {headers : this.reqHeader});
  }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.get(this.rootUrl + 'api/tickets/get_options?' + form, {headers : this.reqHeader});
  }

  getTechnicians(branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&branch_code=' + branchCode;
    return this.http.get(this.rootUrl + 'api/common/branch_users?' + form, {headers : this.reqHeader});
  }

}
