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

  constructor(private http: HttpClient) {
  }

  getBranches() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/reports/get_branches', form, {headers : this.reqHeader});
  }

  getAdhesiveConsumptionReport(fromDate: any, toDate: any, branch: any, stockType: any, status: any) {
  const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_code=' + branch + '&stock_type=' + stockType + '&status=' + status;
  return this.http.get(this.rootUrl + 'api/reports/issued_adhesives?' + form, {headers : this.reqHeader});
  }

  /* getAdhesiveConsumptionReport(fromDate: any, toDate: any, branch: any, stockType: any, status: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken')  + '&user_id=' + localStorage.getItem('userId') + '&from_date=' + fromDate + '&to_date=' + toDate + '&branch_code=' + branch + '&stock_type=' + stockType + '&status=' + status;
    return this.http.get(this.root4Url + 'api/ticketsv6/issued_adhesives?' + form, {headers : this.reqHeader});
    } */
}
