import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdhesiveConsumptionReportService {

  rootUrl = localStorage.getItem('reportsUrl');
  // root4Url = localStorage.getItem('rootUrl');
  // reportUrl = localStorage.getItem('reportsUrl');
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

  getAdhesiveConsumptionReport(fromDate: any, toDate: any, branch: any, stockType: any, status: any) {
  const form = '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_code=' + branch + '&stock_type=' + stockType + '&status=' + status;
  return this.http.get(this.nreportUrl + 'reports/issued_adhesives?' + form, {headers : this.getHeaders()});
  }

  /* getAdhesiveConsumptionReport(fromDate: any, toDate: any, branch: any, stockType: any, status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_code=' + branch + '&stock_type=' + stockType + '&status=' + status;
    return this.http.get(this.root4Url + 'api/ticketsv6/issued_adhesives?' + form, {headers : this.reqHeader});
    } */
}
