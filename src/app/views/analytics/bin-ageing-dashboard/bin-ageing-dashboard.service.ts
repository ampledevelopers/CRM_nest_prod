import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BinAgeingDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded', 'No-Auth': 'True'});
  nreportUrl = localStorage.getItem('nreportUrl');
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

  getBinAgeingDashboard() {
    const form = '&user_id=' + localStorage.getItem('userId') + '&site_type=' + localStorage.getItem('siteType');
    return this.http.post(this.nreportUrl + 'analytics/bin_ageing_dashboard', form, {headers : this.getHeaders()});
  }

  getAgeingTicketList(family: string, type: string, statusId: string, countType: string, branchId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&family=' + family + '&type=' + type  + '&status_id=' + statusId + '&count_type=' + countType + '&branch_id=' + branchId ;
    return this.http.post(this.rootUrl + 'api/charts/ageing_ticket_list', form, {headers : this.reqHeader});
  }

  getTicketsNotificationDetails(notificationType: string, ticketId: string) {
    const form = 'X_API_KEY=' + localStorage.getItem('userToken') + '&user_id=' + localStorage.getItem('userId') +
    '&notificationType=' + notificationType + '&ticketId=' + ticketId ;
    return this.http.post(this.rootUrl + 'api/charts/tickets_notification_details', form, {headers : this.reqHeader});
  }

}
