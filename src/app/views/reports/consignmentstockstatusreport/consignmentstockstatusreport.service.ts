import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsignmentstockstatusreportService {
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

  getConsignmentStockStatusReport(branchId: string, stockType: string, stockStatus: string, partNo: string) {
    const form = '&user_id=' + localStorage.getItem('userId') +
  '&branch_id=' + branchId + '&stock_status=' + stockStatus + '&stock_type=' + stockType + '&part_no=' + partNo ;
      return this.http.post(this.nreportUrl + 'reports/consignment_stock_status_report', form, {headers : this.getHeaders()});
    //+ '&fromDate=' + fromDate + '&toDate=' + toDate
    }
}
