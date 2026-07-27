import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TechnicianPerformanceService {
  reportUrl = localStorage.getItem('reportsUrl');
  rootUrl = localStorage.getItem('rootUrl');
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
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getPerformanceData(fromDate: any, toDate: any, siteTypeId: any, techId: any, branchCode: any, productFamily: any) {
    const form = '&from_date=' + fromDate + '&to_date=' + toDate + '&site_type_id=' + siteTypeId + '&technician_id=' + techId + '&product_family=' + productFamily + '&branch_code=' + branchCode;
    return this.http.get(this.nreportUrl + 'analytics/technician_performance?'+ form, {headers : this.getHeaders()});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'manage-user/get_user_details', form, {headers : this.getHeaders()});
  }

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.get(this.nestUrl + 'common/get_options?' + form, {headers : this.getHeaders()});
  }

  getTechnicians(branchCode: any) {
    const form = '&branch_code=' + branchCode;
    return this.http.get(this.nreportUrl + 'common/branch_users?' + form, {headers : this.getHeaders()});
  }

}
