import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SvrNonsvrAgeingDashboardService {

  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});

  constructor(private http: HttpClient) { }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options', form, {headers : this.reqHeader});
  }

  getSvrNonsvrAgeingDashboard() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&site_type=' + localStorage.getItem('siteType');
    return this.http.post(this.rootUrl + 'api/charts/svr_bin_ageing_dashboard', form, {headers : this.reqHeader});
  }

  getSvrAgeingTicketList(family: string, statusId: string, branchId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&family=' + family + '&status_id=' + statusId + '&branch_id=' + branchId ;
    return this.http.post(this.rootUrl + 'api/charts/svr_ageing_ticket_list', form, {headers : this.reqHeader});
  }

}
