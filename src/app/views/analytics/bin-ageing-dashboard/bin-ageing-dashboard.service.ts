import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BinAgeingDashboardService {
  rootUrl = localStorage.getItem('reportsUrl');
  nestUrl = localStorage.getItem('nestUrl');
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
    const form = 'user_id=' + localStorage.getItem('userId');
    return this.http.post(this.nestUrl + 'common/get_options', form, {headers : this.getHeaders()});
  }

  getBinAgeingDashboard() {
    const form = '&user_id=' + localStorage.getItem('userId') + '&site_type=' + localStorage.getItem('siteType');
    const apiUrl = this.nreportUrl + 'analytics/bin_ageing_dashboard';
    console.log('bin_ageing_dashboard request', {
      apiUrl,
      nreportUrl: this.nreportUrl,
      nreportUrlFromStorage: localStorage.getItem('nreportUrl'),
      form
    });
    return this.http.post(apiUrl, form, { headers: this.getHeaders() }).pipe(
      tap((res: any) => console.log('bin_ageing_dashboard response', res))
    );
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
