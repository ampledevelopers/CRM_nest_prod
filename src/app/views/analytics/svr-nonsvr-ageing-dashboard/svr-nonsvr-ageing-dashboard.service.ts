import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SvrNonsvrAgeingDashboardService {

  rootUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
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

  getOptions() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options', form, {headers : this.getHeaders()});
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
