import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatusDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
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
  constructor(private http: HttpClient) { }

  getOptions() {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId');
    return this.http.post(this.rootUrl + 'api/tickets/get_options', form, {headers : this.reqHeader});
  }

  getBranches() {
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_branches', form, {headers : this.getHeaders()});
  }

  getStatusDashboard(branchCode: any) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') + '&branchCode=' + branchCode ;
    return this.http.post(this.rootUrl + 'api/charts/status_dashboard', form, {headers : this.reqHeader});
  }

  getTicketList(family: string, statusId: string, branchCode: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&family=' + family + '&status_id=' + statusId + '&branchCode=' + branchCode  ;
    return this.http.post(this.rootUrl + 'api/charts/ticket_list', form, {headers : this.reqHeader});
  }

  /* getAnalysis(t_id) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + t_id;
    return this.http.post(this.rootUrl + 'api/tickets/get_analysis', form, {headers : this.reqHeader});
  } */

  timelineData(id: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&ticket_id=' + id /* + '&user_id=' + localStorage.getItem('userId') */;
    return this.http.post(this.rootUrl + 'api/tickets/timeline', form, {headers : this.reqHeader});
  }
}
